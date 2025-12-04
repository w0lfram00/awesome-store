import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../verification/verification.styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from './password.validation';
import { Input } from 'src/shared/components/input';
import { resetUserPassword } from 'src/shared/api/user';

const PasswordResetScreen = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(passwordSchema),
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSubmit = async ({ newPassword }: { newPassword: string }) => {
		try {
			await resetUserPassword(newPassword);
			navigation.replace(NAVIGATION_KEYS.MAIN, {
				screen: NAVIGATION_KEYS.PRODUCTS,
			});
		} catch {
			Toast.show({ type: 'error', text1: 'Unexpected error' });
		}
	};

	return (
		<ScreenWrapper style={styles.screen}>
			<View>
				<Input
					control={control}
					name="newPassword"
					defaultValue={''}
					label="New Password"
				/>
				<Input
					control={control}
					name="passwordConfirm"
					defaultValue={''}
					label="Confirm New Password"
				/>
			</View>
			<DialButton
				onPress={handleSubmit(onSubmit)}
				title="Change password"
			/>
		</ScreenWrapper>
	);
};

export default PasswordResetScreen;

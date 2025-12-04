import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { OptionsStackParamList } from 'src/modules/navigation/types';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { passwordSchema } from './password.validation';
import { Input } from 'src/shared/components/input';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { styles } from '../personalInfo/personal.styles';
import { View } from 'react-native';
import { updateUserPassword } from 'src/shared/api/user';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const PasswordScreen = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(passwordSchema),
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<OptionsStackParamList>>();

	const onSubmit = async ({
		password,
		newPassword,
	}: {
		password: string;
		newPassword: string;
	}) => {
		try {
			await updateUserPassword(password, newPassword);
			navigation.popToTop();
		} catch {
			Toast.show({ type: 'error', text1: 'Unexpected error' });
		}
	};

	return (
		<ScreenWrapper style={styles.screen}>
			<View>
				<Input
					control={control}
					name="password"
					defaultValue={''}
					label="Current Password"
				/>
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
			<DialButton onPress={handleSubmit(onSubmit)} title="Save" />
		</ScreenWrapper>
	);
};

export default PasswordScreen;

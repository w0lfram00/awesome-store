import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { Input } from 'src/shared/components/input';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { emailSchema } from './email.validation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	AuthStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';

const ForgotPasswordScreen = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(emailSchema),
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	return (
		<ScreenWrapper style={{ flex: 1, justifyContent: 'space-between' }}>
			<Input
				control={control}
				name="email"
				defaultValue={''}
				label="Email"
			/>
			<DialButton
				title="Send email"
				onPress={handleSubmit((data) =>
					navigation.navigate(NAVIGATION_KEYS.PASSWORD_RESET_VERIFY, {
						email: data.email,
					}),
				)}
			/>
		</ScreenWrapper>
	);
};

export default ForgotPasswordScreen;

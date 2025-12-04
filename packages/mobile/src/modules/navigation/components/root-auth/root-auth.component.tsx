import React from 'react';
import { AuthStackParamList, NAVIGATION_KEYS } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_OPTIONS } from '../../constants';
import { LoginScreen } from 'src/modules/auth/screens/login';
import RegisterScreen from 'src/modules/auth/screens/register/register.screen';
import EmailVerificationScreen from 'src/modules/auth/screens/emailVerification/emailVerification.screen';
import EmailPasswordVerificationScreen from 'src/modules/auth/screens/forgotPassword/passwordEmail.sceern';
import ForgotPasswordScreen from 'src/modules/auth/screens/forgotPassword/forgotPassword.screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const RootAuth = () => {
	return (
		<Stack.Navigator initialRouteName={NAVIGATION_KEYS.LOGIN}>
			<Stack.Screen
				name={NAVIGATION_KEYS.LOGIN}
				component={LoginScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.REGISTER}
				component={RegisterScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.VERIFICATION}
				component={EmailVerificationScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.FORGOT_PASSWORD}
				component={ForgotPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PASSWORD_RESET_VERIFY}
				component={EmailPasswordVerificationScreen}
				options={SCREEN_OPTIONS}
			/>
		</Stack.Navigator>
	);
};

export default RootAuth;

import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	AuthStackParamList,
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import VerificationScreen from '../verification/verification.screen';
import { loginUser, verifyEmailReq } from 'src/shared/api/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
	route: RouteProp<AuthStackParamList, NAVIGATION_KEYS.VERIFICATION>;
};

const EmailVerificationScreen = ({ route }: Props) => {
	const { email, password } = route.params;
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<VerificationScreen
			email={email}
			onSubmit={async (value: number) => {
				await verifyEmailReq({ token: value, email });
				await loginUser({ email, password });
				navigation.replace(NAVIGATION_KEYS.MAIN, {
					screen: NAVIGATION_KEYS.PRODUCTS,
				});
			}}
		/>
	);
};

export default EmailVerificationScreen;

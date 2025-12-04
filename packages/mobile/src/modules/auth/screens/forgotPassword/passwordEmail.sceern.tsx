import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	AuthStackParamList,
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import VerificationScreen from '../verification/verification.screen';
import { verifyPasswordEmail } from 'src/shared/api/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
	route: RouteProp<AuthStackParamList, NAVIGATION_KEYS.PASSWORD_RESET_VERIFY>;
};

const EmailPasswordVerificationScreen = ({ route }: Props) => {
	const { email } = route.params;
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<VerificationScreen
			email={email}
			onSubmit={async (value: number) => {
				await verifyPasswordEmail({ email, token: value });
				navigation.replace(NAVIGATION_KEYS.PASSWORD_RESET);
			}}
		/>
	);
};

export default EmailPasswordVerificationScreen;

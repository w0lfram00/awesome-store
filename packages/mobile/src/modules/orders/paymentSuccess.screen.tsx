import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import Checkmark from '../../../assets/images/checkmark-circle.svg';
import { styles } from './payment.styles';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_KEYS, OrdersStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PaymentSuccessScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

	return (
		<ScreenWrapper style={styles.screen}>
			<View style={styles.container}>
				<Checkmark />
				<Text style={styles.text}>Payment successful!</Text>
			</View>
			<DialButton
				title="Ok"
				onPress={() => navigation.popTo(NAVIGATION_KEYS.ORDERS_SCREEN)}
			/>
		</ScreenWrapper>
	);
};

export default PaymentSuccessScreen;

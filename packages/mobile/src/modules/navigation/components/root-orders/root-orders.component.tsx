import React from 'react';
import { NAVIGATION_KEYS, OrdersStackParamList } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from 'src/modules/orders/orders.screen';
import { COLORS, FONTS } from 'src/shared/styles';
import OrderDetailScreen from 'src/modules/orders/orderDetails.screen';
import PaymentSuccessScreen from 'src/modules/orders/paymentSuccess.screen';

const Stack = createNativeStackNavigator<OrdersStackParamList>();

const RootOrders = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				headerBackImageSource: require('../../../../../assets/images/back.png'),
				headerStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				headerTitleStyle: {
					fontWeight: '700',
					fontFamily: FONTS.fontFamily,
					fontSize: 24,
				},
				headerShadowVisible: false,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDERS_SCREEN}
				component={OrdersScreen}
				options={{ title: 'Orders' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDER_DETAILS}
				component={OrderDetailScreen}
				options={{ title: 'Order Details' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PAYMENT_SUCCESS}
				component={PaymentSuccessScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default RootOrders;

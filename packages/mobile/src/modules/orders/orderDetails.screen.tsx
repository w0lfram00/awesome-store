import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { NAVIGATION_KEYS, OrdersStackParamList } from '../navigation/types';
import { Text, View } from 'react-native';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import FlatProductList from 'src/shared/components/flatProductList/flatProductList';
import { Order, OrderDetail } from 'src/types/api';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { styles } from './orderDetails.styles';
import DetailItem from './orderDetails.item';
import { getDetailOfOrder, getOrderById, payOrder } from 'src/shared/api/order';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

type Props = {
	route: RouteProp<OrdersStackParamList, NAVIGATION_KEYS.ORDER_DETAILS>;
};

const OrderDetailScreen = ({ route }: Props) => {
	const [order, setOrder] = useState<Order | null>(null);
	const [details, setDetails] = useState<OrderDetail[]>([]);
	const navigation =
		useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

	useEffect(() => {
		const eff = async () => {
			setOrder(await getOrderById(route.params.id));
			setDetails(await getDetailOfOrder(route.params.id));
		};
		eff();
	}, []);

	const onPressPay = async () => {
		if (!order) return;
		try {
			const res = await payOrder(order.id, order.total_amount);
			if (res.payment_status == 'COMPLETE')
				navigation.navigate(NAVIGATION_KEYS.PAYMENT_SUCCESS);
		} catch {
			Toast.show({
				type: 'error',
				text1: 'Operation declined. Try again later',
			});
			navigation.goBack();
		}
	};

	return (
		<ScreenWrapper style={styles.screen}>
			<View style={{ flexShrink: 1 }}>
				<Text
					style={styles.total}
				>{`Total amount: $${order?.total_amount}`}</Text>
				<FlatProductList<OrderDetail>
					data={details}
					renderItem={(item) => (
						<DetailItem item={item.item} setDetails={setDetails} />
					)}
				/>
			</View>
			<DialButton
				title="Pay"
				onPress={onPressPay}
				disabled={order?.payment_status == 'COMPLETE'}
			/>
		</ScreenWrapper>
	);
};

export default OrderDetailScreen;

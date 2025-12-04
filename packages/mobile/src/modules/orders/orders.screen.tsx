import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { getAllOrders } from 'src/shared/api/order';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { useOrder } from 'src/shared/hooks/useOrder';
import { DeliveryStatus, Order, PaymentStatus, SortBy } from 'src/types/api';
import OrderItem from './order.item';
import { styles } from './orders.styles';
import OrderFilter from './order.filter.component';
import FlatProductList from 'src/shared/components/flatProductList/flatProductList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../navigation/types';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const OrdersScreen = () => {
	const [shownOrders, setShownOrders] = useState<Order[]>([]);
	const navigation =
		useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();
	const { order } = useOrder();
	const [payment, setPayment] = useState<PaymentStatus | 'ALL'>('ALL');
	const [delivery, setDelivery] = useState<DeliveryStatus | 'ALL'>('ALL');
	const [dateSort, setDateSort] = useState<SortBy>('DESC');

	const getOrder = async () => {
		const payment_status = payment == 'ALL' ? undefined : payment;
		const delivery_status = delivery == 'ALL' ? undefined : delivery;

		const res = await getAllOrders({
			payment_status,
			delivery_status,
			sort: dateSort.toLocaleLowerCase(),
		});
		setShownOrders(res.filter((item) => item.id != order?.id));
	};

	useFocusEffect(
		useCallback(() => {
			getOrder();
		}, [payment, delivery, dateSort]),
	);

	return (
		<BottomSheetModalProvider>
			<ScreenWrapper>
				<Text style={styles.boldText}>Filter by</Text>
				<View style={styles.filtersCont}>
					<OrderFilter
						value={payment}
						label="Payment:"
						onPress={(value: PaymentStatus | 'ALL') => {
							setPayment(value);
						}}
						options={['ALL', 'PENDING', 'COMPLETE', 'FAILED']}
					/>
					<OrderFilter
						value={delivery}
						label="Delivery:"
						onPress={(value: DeliveryStatus | 'ALL') => {
							setDelivery(value);
						}}
						options={['ALL', 'PENDING', 'IN_TRANSIT', 'DELIVERED']}
					/>
					<OrderFilter
						value={dateSort}
						label="Date:"
						onPress={(value: SortBy) => {
							setDateSort(value);
						}}
						options={['ASC', 'DESC']}
					/>
				</View>
				<View></View>
				<FlatProductList<Order>
					data={shownOrders}
					renderItem={(item) => (
						<OrderItem order={item.item} navigation={navigation} />
					)}
				/>
			</ScreenWrapper>
		</BottomSheetModalProvider>
	);
};

export default OrdersScreen;

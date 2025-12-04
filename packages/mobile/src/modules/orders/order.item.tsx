import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Order } from 'src/types/api';
import { styles } from './orders.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, OrdersStackParamList } from '../navigation/types';

type Props = {
	order: Order;
	navigation: NativeStackNavigationProp<OrdersStackParamList>;
};

const OrderItem = ({ order, navigation }: Props) => {
	return (
		<Pressable
			onPress={() =>
				navigation.navigate(NAVIGATION_KEYS.ORDER_DETAILS, {
					id: order.id,
				})
			}
		>
			<View style={styles.itemContainer}>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>Date:</Text>
					<Text style={styles.text}>
						{order.createdAt.toString()}
					</Text>
				</View>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>ID:</Text>
					<Text style={styles.text}>{order.id}</Text>
				</View>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>Payment Status:</Text>
					<Text style={styles.text}>{order.payment_status}</Text>
				</View>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>Delivery Status:</Text>
					<Text style={styles.text}>{order.delivery_status}</Text>
				</View>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>Total:</Text>
					<Text style={styles.text}>{`$${order.total_amount}`}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default OrderItem;

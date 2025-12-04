import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { styles } from './cart.styles';
import FlatProductList from 'src/shared/components/flatProductList/flatProductList';
import { OrderDetail } from 'src/types/api';
import CartItem from './cart.item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	ProductStackParamList,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useOrder } from 'src/shared/hooks/useOrder';
import { getDetailOfOrder, getOrderById } from 'src/shared/api/order';
import { useUserStore } from 'src/shared/store/useUserStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CartScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
	const navGlobal =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { details, setDetails, setOrder, order } = useOrder();

	const onPress = () => {
		useUserStore.getState().setCurOrder('');
		navGlobal.navigate(NAVIGATION_KEYS.MAIN, {
			screen: NAVIGATION_KEYS.ORDERS,
		});
	};

	useFocusEffect(
		useCallback(() => {
			let isActive = true;

			const fetchData = async () => {
				if (!order) return;
				const newOrder = await getOrderById(order.id);
				const newDetails = await getDetailOfOrder(order.id);

				if (isActive) {
					setOrder(newOrder);
					setDetails(newDetails);
				}
			};

			fetchData();

			return () => {
				isActive = false;
			};
		}, []),
	);

	return (
		<ScreenWrapper style={styles.screen}>
			<View style={{ flexShrink: 1 }}>
				<Text
					style={styles.total}
				>{`Total amount: $${order?.total_amount}`}</Text>
				<FlatProductList<OrderDetail>
					data={details}
					renderItem={(item) => (
						<CartItem item={item.item} navigation={navigation} />
					)}
				/>
			</View>
			<DialButton title="Create Order" onPress={onPress} />
		</ScreenWrapper>
	);
};

export default CartScreen;

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import {
	NAVIGATION_KEYS,
	ProductStackParamList,
} from 'src/modules/navigation/types';
import { OrderDetail } from 'src/types/api';
import { styles } from './cart.item.styles';
import Trash from '../../../../assets/images/trash-bin.svg';
import { deleteDetail } from 'src/shared/api/order';
import { useOrder } from 'src/shared/hooks/useOrder';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
	item: OrderDetail;
	navigation: NativeStackNavigationProp<ProductStackParamList>;
};

const CartItem = ({ item, navigation }: Props) => {
	const { order, deleteDetail: deleteD } = useOrder();
	return (
		<Pressable
			onPress={() =>
				navigation.navigate(
					NAVIGATION_KEYS.CART_EDIT,
					{ id: item.id },
					{
						pop: true,
					},
				)
			}
		>
			<View style={styles.itemContainer}>
				<View style={styles.infoCont}>
					<Text style={styles.text}>{item.product.name}</Text>
					<View style={styles.statCont}>
						<View style={styles.itemTextCont}>
							<Text style={styles.boldText}>Total:</Text>
							<Text
								style={styles.text}
							>{`$${item.price_at_purchase * item.quantity}`}</Text>
						</View>
						<View style={styles.itemTextCont}>
							<Text style={styles.boldText}>Amount:</Text>
							<Text style={styles.text}>
								{item.quantity.toString()}
							</Text>
						</View>
					</View>
				</View>
				<Pressable
					onPress={async () => {
						if (!order) return;
						await deleteDetail(order?.id, item.id);
						deleteD(item.id);
					}}
				>
					<Trash width={20} height={20} style={styles.trash} />
				</Pressable>
			</View>
		</Pressable>
	);
};

export default CartItem;

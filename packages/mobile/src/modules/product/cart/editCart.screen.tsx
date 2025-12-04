import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
	NAVIGATION_KEYS,
	ProductStackParamList,
} from 'src/modules/navigation/types';
import {
	deleteDetail,
	getDetailById,
	updateDetail,
} from 'src/shared/api/order';
import ProductInfoDisplay from 'src/shared/components/productInfoDisplay/productInfoDisplay.component';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { useOrder } from 'src/shared/hooks/useOrder';
import { OrderDetail } from 'src/types/api';
import { styles } from './cart.styles';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
	route: RouteProp<ProductStackParamList, NAVIGATION_KEYS.CART_EDIT>;
};

const EditCartScreen = ({ route }: Props) => {
	const { order, deleteDetail: deleteD } = useOrder();
	const [item, setItem] = useState<OrderDetail | null>(null);
	const navigation =
		useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

	useEffect(() => {
		const eff = async () => {
			if (order) setItem(await getDetailById(order?.id, route.params.id));
		};
		eff();
	}, [order]);

	const onPress = async () => {
		if (order && item) {
			await updateDetail(order.id, item?.id, {
				quantity: item?.quantity,
			});
			navigation.goBack();
		}
	};

	if (!item || !item.product) return null;
	return (
		<ScreenWrapper style={styles.screen}>
			<View>
				<ProductInfoDisplay
					product={item.product}
					amount={item.quantity}
					setAmount={(amount: number) =>
						setItem({ ...item, quantity: amount })
					}
				/>
				<Pressable
					onPress={async () => {
						if (!order) return;
						await deleteDetail(order?.id, item.id);
						deleteD(item.id);
						navigation.goBack();
					}}
				>
					<Text style={styles.deleteButton}>
						Remove from the cart
					</Text>
				</Pressable>
			</View>
			<DialButton title="Save" onPress={onPress} />
		</ScreenWrapper>
	);
};

export default EditCartScreen;

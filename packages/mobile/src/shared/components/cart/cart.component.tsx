import React from 'react';
import CartIcon from '../../../../assets/images/cart.svg';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from 'src/shared/styles';
import {
	NAVIGATION_KEYS,
	ProductStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrder } from 'src/shared/hooks/useOrder';

type Prop = {
	navigation: NativeStackNavigationProp<
		ProductStackParamList,
		keyof ProductStackParamList
	>;
};

const Cart = ({ navigation }: Prop) => {
	const { details } = useOrder();

	return (
		<Pressable onPress={() => navigation.navigate(NAVIGATION_KEYS.CART)}>
			<View>
				<CartIcon style={styles.icon} />
				{details?.length && (
					<Text style={styles.count}>
						{details.length.toString()}
					</Text>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	icon: { position: 'relative' },
	count: {
		position: 'absolute',
		fontSize: 10,
		color: COLORS.white,
		backgroundColor: COLORS.red,
		width: 19,
		height: 19,
		textAlign: 'center',
		paddingTop: 2,
		borderRadius: 100,
		top: 12,
		right: -6,
	},
});

export default Cart;

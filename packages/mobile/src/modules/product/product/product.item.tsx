import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ProductPreview } from 'src/types/api';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	ProductStackParamList,
} from 'src/modules/navigation/types';
import { styles } from './productItem.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = { item: ProductPreview };

const ProductItem = ({ item }: Props) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

	return (
		<Pressable
			onPress={() =>
				navigation.navigate(NAVIGATION_KEYS.INFO_PRODUCT, {
					id: item.id,
				})
			}
		>
			<View style={styles.itemContainer}>
				<View style={styles.infoCont}>
					<Text style={styles.text}>{item.name}</Text>
					<View style={styles.itemTextCont}>
						<Text style={styles.boldText}>Category:</Text>
						<Text style={styles.text}>{item.category}</Text>
					</View>
				</View>
				<View style={styles.itemTextCont}>
					<Text style={styles.boldText}>Price:</Text>
					<Text style={styles.text}>{`$${item.price}`}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ProductItem;

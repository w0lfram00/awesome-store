import React, { useEffect, useState } from 'react';
import { NAVIGATION_KEYS, ProductStackParamList } from '../../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { getProductById } from 'src/shared/api/product';
import Toast from 'react-native-toast-message';
import { Product } from 'src/types/api';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { infoStyles } from './productInfo.styles';
import ProductInfoDisplay from 'src/shared/components/productInfoDisplay/productInfoDisplay.component';
import { addDetailToOrder } from 'src/shared/api/order';
import { useOrder } from 'src/shared/hooks/useOrder';

type Props = {
	route: RouteProp<ProductStackParamList, NAVIGATION_KEYS.INFO_PRODUCT>;
};

const InfoProduct = ({ route }: Props) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [amount, setAmount] = useState<number>(1);
	const { order, addDetail } = useOrder();
	useEffect(() => {
		const eff = async () => {
			try {
				const result = await getProductById(route.params.id);
				setProduct(result);
			} catch {
				Toast.show({
					type: 'error',
					text1: 'Failed to search',
				});
			}
		};
		eff();
	}, []);

	if (!product) return null;

	return (
		<ScreenWrapper style={infoStyles.screen}>
			<ProductInfoDisplay
				amount={amount}
				setAmount={setAmount}
				product={product}
			/>
			<DialButton
				title="Add to Cart"
				onPress={async () => {
					if (order) {
						const res = await addDetailToOrder(order?.id, {
							quantity: amount,
							product_id: product.id,
							price_at_purchase: product.price,
							product,
						});
						addDetail(res);
					}
				}}
			/>
		</ScreenWrapper>
	);
};

export default InfoProduct;

import React, { useState } from 'react';
import { TextInput } from 'react-native';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { styles } from './product.styles';
import { ProductPreview } from 'src/types/api';
import { getAllProducts } from 'src/shared/api/product';
import Toast from 'react-native-toast-message';
import { useDebounceEffect } from 'src/shared/hooks/useDebounceEffect';
import FlatProductList from 'src/shared/components/flatProductList/flatProductList';
import ProductItem from './product.item';

const ProductScreen = () => {
	const [products, setProducts] = useState<ProductPreview[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	const [sort] = useState<'asc' | 'desc' | undefined>(undefined);

	const findProduct = async () => {
		try {
			setRefreshing(true);
			const result = await getAllProducts({ query, page, sort });
			if (page != 1) setProducts([...products, ...result]);
			else setProducts(result);
		} catch {
			Toast.show({
				type: 'error',
				text1: 'Failed to search',
			});
		} finally {
			setRefreshing(false);
		}
	};

	const onRefresh = () => {
		setProducts([]);
		setPage(1);
		findProduct();
	};
	const onEndReached = () => {
		if (!refreshing && products.length > 0) setPage((ref) => ref + 1);
	};

	useDebounceEffect(() => {
		findProduct();
	}, [query, page]);

	return (
		<ScreenWrapper>
			<TextInput
				placeholder="Enter product name"
				style={styles.input}
				value={query}
				onChangeText={setQuery}
			/>
			<FlatProductList<ProductPreview>
				data={products}
				onRefresh={onRefresh}
				onEndReached={onEndReached}
				refreshing={refreshing}
				renderItem={(item) => <ProductItem item={item.item} />}
			/>
		</ScreenWrapper>
	);
};

export default ProductScreen;

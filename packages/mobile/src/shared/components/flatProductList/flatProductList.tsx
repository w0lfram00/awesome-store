import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

type Props<T> = {
	data: T[];
	onRefresh?: () => void;
	onEndReached?: () => void;
	refreshing?: boolean;
	renderItem: ListRenderItem<T>;
};

function FlatProductList<T>({
	data,
	onRefresh,
	refreshing,
	onEndReached,
	renderItem,
}: Props<T>) {
	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) =>
				(item as { id: string }).id || index.toString()
			}
			showsVerticalScrollIndicator
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListFooterComponent={<View style={{ height: 100 }}></View>}
			ListEmptyComponent={<Text>Nothing was found</Text>}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
		/>
	);
}

export default FlatProductList;

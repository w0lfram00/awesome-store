import React, { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './orders.styles';
import { COLORS } from 'src/shared/styles';
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

type Props<T> = {
	label: string;
	value: T;
	onPress: (value: T) => void;
	options: T[];
};

function OrderFilter<T extends string>({
	label,
	value,
	onPress,
	options,
}: Props<T>) {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<>
			<Pressable onPress={handlePresentModalPress}>
				<View>
					<Text style={styles.boldText}>{label}</Text>
					<Text style={{ color: COLORS.green, marginTop: 5 }}>
						{value}
					</Text>
				</View>
			</Pressable>
			<BottomSheetModal ref={bottomSheetModalRef}>
				<BottomSheetView>
					{options.map((item) => (
						<Pressable onPress={() => onPress(item)}>
							<Text
								style={[
									styles.modalText,
									item == value && styles.activeText,
								]}
							>
								{item}
							</Text>
						</Pressable>
					))}
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
}

export default OrderFilter;

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
};

const ScreenWrapper = ({ children, style }: Props) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 30,
	},
});

export default ScreenWrapper;

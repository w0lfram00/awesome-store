import React from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

type Props = {
	title: string;
	onPress: () => void | Promise<void>;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
};

const DialButton = ({ title, onPress, disabled, style, textStyle }: Props) => {
	return (
		<TouchableOpacity
			style={[styles.container, style, disabled && styles.disabled]}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.4}
		>
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 'auto',
		borderRadius: 10,
		backgroundColor: COLORS.blue,
		padding: 12,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 16,
		fontFamily: FONTS.secondFamily,
		fontWeight: 700,
		color: COLORS.white,
	},
	disabled: {
		backgroundColor: COLORS.grey,
	},
});

export default DialButton;

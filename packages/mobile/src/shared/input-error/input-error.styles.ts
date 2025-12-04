import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../styles';

export const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		fontSize: 14,
		color: COLORS.red,
		fontFamily: FONTS.secondFamily,
	},
});

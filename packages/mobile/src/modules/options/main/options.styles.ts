import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	link: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		marginBottom: 20,
		marginLeft: 10,
	},
	red: {
		color: COLORS.red,
	},
	close: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		backgroundColor: COLORS.grey,
		borderRadius: 50,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
});

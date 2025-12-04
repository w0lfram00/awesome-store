import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	input: {
		borderColor: COLORS.borderGrey,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingTop: 6,
		backgroundColor: COLORS.white,
		height: 50,
		fontSize: 16,
		fontFamily: FONTS.fontFamily,
		fontWeight: 400,
		marginBottom: 20,
	},
	text: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
	},
	boldText: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		fontWeight: 700,
	},
});

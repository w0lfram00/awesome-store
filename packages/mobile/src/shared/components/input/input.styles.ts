import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingBottom: 20,
		marginBottom: 10,
	},
	input: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 12,
		fontSize: 16,
		fontFamily: FONTS.fontFamily,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.borderGrey,
		backgroundColor: COLORS.white,
		marginVertical: 6,
	},
	label: {
		fontFamily: FONTS.secondFamily,
		fontSize: 14,
		color: COLORS.lightGrey,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.red,
	},
	correct: {
		borderWidth: 1,
	},
});

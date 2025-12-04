import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
	},
	inputContainer: {
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
		backgroundColor: COLORS.disabledBg,
		color: COLORS.disabledText,
		marginVertical: 6,
	},
	label: {
		fontFamily: FONTS.secondFamily,
		fontSize: 14,
		color: COLORS.lightGrey,
	},
	delete: {
		color: COLORS.red,
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		fontWeight: 600,
		textAlign: 'center',
		marginTop: 20,
	},
});

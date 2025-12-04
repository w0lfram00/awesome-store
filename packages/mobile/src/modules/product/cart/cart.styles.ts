import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
	},
	deleteButton: {
		color: COLORS.red,
		fontSize: 16,
		fontFamily: FONTS.fontFamily,
		fontWeight: 600,
		textAlign: 'center',
		marginTop: 25,
	},
	total: {
		fontFamily: FONTS.secondFamily,
		fontWeight: 700,
		fontSize: 16,
		marginBottom: 30,
		textAlign: 'center',
	},
});

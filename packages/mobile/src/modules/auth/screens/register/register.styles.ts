import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 16,
		fontFamily: FONTS.fontFamily,
		fontWeight: 700,
		marginBottom: 40,
		textAlign: 'center',
	},
	signUpQuestion: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 40,
		justifyContent: 'center',
	},
	signUpText: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
	},
	signUpLink: {
		color: COLORS.blue,
		fontWeight: 700,
	},
});

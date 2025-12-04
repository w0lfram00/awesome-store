import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 47,
	},
	title: {
		textAlign: 'center',
		fontFamily: FONTS.forthFamily,
		fontSize: 40,
	},
	img: {
		alignSelf: 'center',
	},
	inputContainer: {},
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

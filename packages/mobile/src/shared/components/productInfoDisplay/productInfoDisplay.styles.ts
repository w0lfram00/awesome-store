import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	infoContainer: { gap: 5, marginBottom: 20, minHeight: 350, padding: 10 },
	count: {
		fontFamily: FONTS.secondFamily,
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 700,
	},
	countCont: {
		borderColor: COLORS.grey,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: COLORS.white,
		width: 44,
		height: 50,
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		borderRadius: 1000,
		width: 46,
		height: 48,
		paddingTop: 7,
	},
	buttonText: {
		fontFamily: FONTS.secondFamily,
		fontSize: 24,
	},
	countMenu: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
		margin: 'auto',
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

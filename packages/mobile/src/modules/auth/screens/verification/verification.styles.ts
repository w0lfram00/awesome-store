import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screen: { flex: 1, justifyContent: 'space-between' },
	container: { flex: 1, gap: 40, alignItems: 'center', paddingTop: 70 },
	title: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		fontWeight: 700,
		textAlign: 'center',
	},
	message: {
		fontFamily: FONTS.secondFamily,
		color: COLORS.lightGrey,
		textAlign: 'center',
	},
	input: { width: 206 },
	cell: {
		width: 44,
		height: 50,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.borderGrey,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellText: {
		fontFamily: FONTS.fontFamily,
		fontSize: 40,
	},
});

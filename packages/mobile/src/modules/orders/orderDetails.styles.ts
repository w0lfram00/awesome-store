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
	text: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
	},
	boldText: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		fontWeight: 700,
	},
	itemContainer: {
		borderColor: COLORS.lightGrey,
		padding: 10,
		borderWidth: 1,
		marginTop: 10,
		borderRadius: 10,
		height: 82,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
	},
	infoCont: { display: 'flex', justifyContent: 'space-between' },
	statCont: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
	},
	itemTextCont: {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
	},
	trash: {
		position: 'absolute',
		right: 22,
		top: 20,
	},
});

import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
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
		flex: 1,
		justifyContent: 'space-between',
		gap: 5,
	},
	itemTextCont: {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
	},
	filtersCont: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 20,
	},
	modalText: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		marginVertical: 8,
		marginHorizontal: 26,
	},
	activeText: { color: COLORS.green },
});

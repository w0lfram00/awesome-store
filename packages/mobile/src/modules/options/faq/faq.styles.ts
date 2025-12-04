import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 4,
	},
	text: { fontFamily: FONTS.fontFamily, fontSize: 16 },
	itemContainer: {},
	icon: {
		position: 'absolute',
		right: 0,
		top: 6,
	},
});

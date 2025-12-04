import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	screen: {
		justifyContent: 'space-between',
		flex: 1,
	},
	text: {
		fontSize: 16,
		fontFamily: FONTS.fontFamily,
		marginTop: 20,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

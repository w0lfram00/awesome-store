/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '../navigation/components/root-navigator';
import Toast from 'react-native-toast-message';

const loadFonts = () =>
	Font.loadAsync({
		Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
		Poppins: require('../../../assets/fonts/Poppins-Regular.ttf'),
		Roboto: require('../../../assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
		Kaushan: require('../../../assets/fonts/KaushanScript-Regular.ttf'),
	});

export const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		loadFonts().then(() => setFontsLoaded(true));
	}, []);

	if (!fontsLoaded) return null;

	return (
		<SafeAreaProvider>
			<RootNavigator />
			<Toast />
		</SafeAreaProvider>
	);
};

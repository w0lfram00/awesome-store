import React from 'react';
import { NAVIGATION_KEYS, OptionsStackParamList } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS } from 'src/shared/styles';
import OptionsScreen from 'src/modules/options/main/options.screen';
import PersonalInfoScreen from 'src/modules/options/personalInfo/personalInfo.screen';
import PasswordScreen from 'src/modules/options/password/password.screen';
import FaqScreen from 'src/modules/options/faq/faq.screen';

const Stack = createNativeStackNavigator<OptionsStackParamList>();

const RootOptions = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				headerBackImageSource: require('../../../../../assets/images/back.png'),
				headerStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				headerTitleStyle: {
					fontWeight: '700',
					fontFamily: FONTS.fontFamily,
					fontSize: 24,
				},
				headerShadowVisible: false,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.OPTIONS_SCREEN}
				component={OptionsScreen}
				options={{ title: 'Settings' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PERSONAL_INFO}
				component={PersonalInfoScreen}
				options={{ title: 'Personal Info' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.CHANGE_PASSWORD}
				component={PasswordScreen}
				options={{ title: 'Change password' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.FAQ}
				component={FaqScreen}
				options={{ title: 'FAQ' }}
			/>
		</Stack.Navigator>
	);
};

export default RootOptions;

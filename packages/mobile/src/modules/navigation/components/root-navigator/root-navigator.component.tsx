import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavContainer } from '../nav-container/nav-container.component';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../types/navigation.type';
import { BottomTabs } from '../bottom-tabs';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import RootAuth from '../root-auth/root-auth.component';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ForgotPasswordScreen from 'src/modules/auth/screens/forgotPassword/passwordReset.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const isAuth = useAuthStore((state) => state.isAuth);

	return (
		<NavContainer>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{isAuth ? (
						<>
							<Stack.Screen
								name={NAVIGATION_KEYS.MAIN}
								component={BottomTabs}
							/>
							<Stack.Screen
								name={NAVIGATION_KEYS.PASSWORD_RESET}
								component={ForgotPasswordScreen}
							/>
						</>
					) : (
						<Stack.Screen
							name={NAVIGATION_KEYS.AUTH}
							component={RootAuth}
						/>
					)}
				</Stack.Navigator>
			</GestureHandlerRootView>
		</NavContainer>
	);
};

import React, { useState } from 'react';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import OptionLink from './optionLink.component';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	OptionsStackParamList,
} from 'src/modules/navigation/types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from './options.styles';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import { WebView } from 'react-native-webview';
import { COLORS } from 'src/shared/styles';
import Modal from 'react-native-modal';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoutUser } from 'src/shared/api/auth';

const OptionsScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<OptionsStackParamList>>();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const insets = useSafeAreaInsets();

	return (
		<ScreenWrapper>
			<OptionLink
				navigation={navigation}
				label="Personal info"
				to={NAVIGATION_KEYS.PERSONAL_INFO}
			/>
			<OptionLink
				navigation={navigation}
				label="Change password"
				to={NAVIGATION_KEYS.CHANGE_PASSWORD}
			/>
			<OptionLink
				navigation={navigation}
				label="FAQ"
				to={NAVIGATION_KEYS.FAQ}
			/>
			<Pressable onPress={() => setIsVisible((ref) => !ref)}>
				<Text style={styles.link}>Terms & Conditions</Text>
			</Pressable>
			<Modal isVisible={isVisible}>
				<View style={insetStyles(insets).modal}>
					<WebView
						source={{
							uri: 'https://www.google.com',
						}}
						style={{ flex: 1 }}
					/>
					<Pressable onPress={() => setIsVisible((ref) => !ref)}>
						<Text style={styles.close}>X</Text>
					</Pressable>
				</View>
			</Modal>
			<Pressable
				onPress={() => {
					logoutUser();
					useAuthStore.getState().logout();
				}}
			>
				<Text style={[styles.link, styles.red]}>Logout</Text>
			</Pressable>
		</ScreenWrapper>
	);
};

const insetStyles = (insets: EdgeInsets) =>
	StyleSheet.create({
		modal: {
			position: 'relative',
			flex: 1,
			backgroundColor: COLORS.green,
			paddingRight: insets.right,
			paddingLeft: insets.left,
			paddingBottom: insets.bottom,
			paddingTop: insets.top,
		},
	});

export default OptionsScreen;

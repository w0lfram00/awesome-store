import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Image, Pressable, Text, View } from 'react-native';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './login.validation';
import { styles } from './login.styles';
import { Input } from 'src/shared/components/input';
import {
	AuthStackParamList,
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from 'src/shared/api/auth';
import { LoginUserDto } from 'src/types/api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const LoginScreen = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(loginSchema),
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const navLocal =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

	const onSubmit = async (data: LoginUserDto) => {
		try {
			const user = await loginUser(data);
			useAuthStore.getState().setToken(user.accessToken);
			navigation.replace(NAVIGATION_KEYS.MAIN, {
				screen: NAVIGATION_KEYS.PRODUCTS,
			});
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				if (
					err.status == 401 &&
					err.response?.data.message === 'User is not verified'
				)
					navLocal.navigate(NAVIGATION_KEYS.VERIFICATION, {
						email: data.email,
						password: data.password,
					});
				else
					Toast.show({
						type: 'error',
						text1: 'Could not sign you in',
						text2: 'Please try again later',
					});
			}
		}
	};

	return (
		<ScreenWrapper style={styles.screenContainer}>
			<View style={{ display: 'flex' }}>
				<Image
					// eslint-disable-next-line @typescript-eslint/no-require-imports
					source={require('../../../../../assets/images/logo.png')}
					style={styles.img}
				/>
				<Text style={styles.title}>Awesome Store</Text>
				<Input
					control={control}
					name="email"
					defaultValue={''}
					label="Email"
					extraInputContainerStyles={styles.inputContainer}
				/>
				<Input
					control={control}
					name="password"
					defaultValue={''}
					label="Password"
					extraInputContainerStyles={styles.inputContainer}
				/>
			</View>
			<View>
				<DialButton title="Sign in" onPress={handleSubmit(onSubmit)} />
				<View style={styles.signUpQuestion}>
					<Text style={styles.signUpText}>
						Don't have an account yet?
					</Text>
					<Pressable
						onPress={() => {
							navLocal.navigate(NAVIGATION_KEYS.REGISTER);
						}}
					>
						<Text style={[styles.signUpText, styles.signUpLink]}>
							{' Sing up'}
						</Text>
					</Pressable>
				</View>
				<View style={styles.signUpQuestion}>
					<Text style={styles.signUpText}>Forgot your password?</Text>
					<Pressable
						onPress={() => {
							navLocal.navigate(NAVIGATION_KEYS.FORGOT_PASSWORD);
						}}
					>
						<Text style={[styles.signUpText, styles.signUpLink]}>
							{' Restore password'}
						</Text>
					</Pressable>
				</View>
			</View>
		</ScreenWrapper>
	);
};

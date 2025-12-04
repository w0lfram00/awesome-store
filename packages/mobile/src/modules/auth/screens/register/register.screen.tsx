import React from 'react';
import { styles } from './register.styles';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Input } from 'src/shared/components/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './register.validation';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { registerUser } from 'src/shared/api/auth';
import { useNavigation } from '@react-navigation/native';
import {
	AuthStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { RegisterUserDto } from 'src/types/api';
import Toast from 'react-native-toast-message';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RegisterScreen = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(registerSchema),
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
	const onSubmit = async (
		data: RegisterUserDto & { passwordConfirm?: string },
	) => {
		try {
			delete data.passwordConfirm;
			const user = await registerUser(data);
			navigation.navigate(NAVIGATION_KEYS.VERIFICATION, {
				email: user.email,
				password: data.password,
			});
		} catch {
			Toast.show({
				type: 'error',
				text1: 'Registration failed',
				text2: 'Try later',
			});
		}
	};

	return (
		<ScrollView>
			<ScreenWrapper style={styles.screenContainer}>
				<Text style={styles.title}>Sign Up</Text>
				<Input
					control={control}
					name="email"
					defaultValue={''}
					label="Email"
				/>
				<Input
					control={control}
					name="name"
					defaultValue={''}
					label="Full name"
				/>
				<Input
					control={control}
					name="phone"
					defaultValue={''}
					label="Phone number"
				/>
				<Input
					control={control}
					name="address"
					defaultValue={''}
					label="Shipping address"
				/>
				<Input
					control={control}
					name="password"
					defaultValue={''}
					label="Password"
				/>
				<Input
					control={control}
					name="passwordConfirm"
					defaultValue={''}
					label="Confirm Password"
				/>
				<DialButton
					title="Sign up"
					onPress={handleSubmit(onSubmit)}
					style={{ marginTop: 20 }}
				/>
				<View style={styles.signUpQuestion}>
					<Text style={styles.signUpText}>
						Don't have an account yet?
					</Text>
					<Pressable
						onPress={() => {
							navigation.navigate(NAVIGATION_KEYS.LOGIN);
						}}
					>
						<Text style={[styles.signUpText, styles.signUpLink]}>
							{' Sing in'}
						</Text>
					</Pressable>
				</View>
			</ScreenWrapper>
		</ScrollView>
	);
};

export default RegisterScreen;

import React, { useCallback, useState } from 'react';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OptionsStackParamList } from 'src/modules/navigation/types';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from './personalInfo.validation';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { Input } from 'src/shared/components/input';
import { styles } from './personal.styles';
import { deleteCurUser, getCurUser, updateUserData } from 'src/shared/api/user';
import { User } from 'src/types/api';
import Toast from 'react-native-toast-message';
import { useAuthStore } from 'src/shared/store/useAuthStore';

const PersonalInfoScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<OptionsStackParamList>>();
	const [user, setUser] = useState<Partial<User>>({});
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(personalInfoSchema),
		values: {
			name: user.name || '',
			phone: user.phone || '',
			address: user.address || '',
		},
	});

	useFocusEffect(
		useCallback(() => {
			const eff = async () => {
				const user = await getCurUser();
				setUser(user);
			};
			eff();
		}, []),
	);

	const onSubmit = async (data: {
		name: string;
		address: string;
		phone: string;
	}) => {
		try {
			const newUser = await updateUserData(data);
			useAuthStore.getState().setToken(newUser.accessToken);
			navigation.goBack();
		} catch {
			Toast.show({ type: 'error', text1: 'Unexpected error' });
		}
	};

	return (
		<ScreenWrapper style={styles.screen}>
			<View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Email</Text>
					<TextInput style={styles.input} value={user?.email} />
				</View>
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
				<Pressable
					onPress={() => {
						deleteCurUser();
						useAuthStore.getState().logout();
					}}
				>
					<Text style={styles.delete}>Delete Account</Text>
				</Pressable>
			</View>
			<DialButton onPress={handleSubmit(onSubmit)} title="Save" />
		</ScreenWrapper>
	);
};

export default PersonalInfoScreen;

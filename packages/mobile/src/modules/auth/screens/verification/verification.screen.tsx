import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import {
	CodeField,
	RenderCellOptions,
} from 'react-native-confirmation-code-field';
import { styles } from './verification.styles';
import DialButton from 'src/shared/components/dialButton/dialButton.component';
import { sendVerifyEmail } from 'src/shared/api/auth';
import Toast from 'react-native-toast-message';

type Prop = {
	onSubmit: (value: number) => Promise<void>;
	email: string;
};

const VerificationScreen = ({ onSubmit: onSubmitProp, email }: Prop) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		const task = async () => {
			try {
				await sendVerifyEmail({ email });
			} catch {
				Toast.show({
					type: 'error',
					text1: 'Failed to send email',
				});
			}
		};
		task();
	}, []);

	const onSubmit = async () => {
		try {
			await onSubmitProp(+value);
		} catch {
			Toast.show({
				type: 'error',
				text1: 'Wrong code',
			});
		}
	};

	return (
		<ScreenWrapper style={styles.screen}>
			<View style={styles.container}>
				<Text style={styles.title}>Email Verification</Text>
				<Text style={styles.message}>
					Please type the code from the email
				</Text>
				<CodeField
					value={value}
					onChangeText={setValue}
					keyboardType="number-pad"
					cellCount={4}
					rootStyle={styles.input}
					renderCell={({ index, symbol }: RenderCellOptions) => (
						<View key={index} style={styles.cell}>
							<Text style={styles.cellText}>{symbol}</Text>
						</View>
					)}
				/>
			</View>
			<DialButton title="Submit" onPress={onSubmit} />
		</ScreenWrapper>
	);
};

export default VerificationScreen;

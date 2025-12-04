import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { OptionsStackParamList } from 'src/modules/navigation/types';
import { styles } from './options.styles';

type Props = {
	label: string;
	to: keyof OptionsStackParamList;
	navigation: NativeStackNavigationProp<OptionsStackParamList>;
};

const OptionLink = ({ label, to, navigation }: Props) => {
	return (
		<Pressable onPress={() => navigation.navigate(to)}>
			<Text style={styles.link}>{label}</Text>
		</Pressable>
	);
};

export default OptionLink;

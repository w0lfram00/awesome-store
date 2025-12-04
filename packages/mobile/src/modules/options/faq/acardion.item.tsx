import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { styles } from './faq.styles';
import Icon from '../../../../assets/images/back.svg';

type Props = {
	title: string;
	children: React.ReactNode;
};

const AccordionItem = ({ title, children }: Props) => {
	const [expanded, setExpanded] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const height = useSharedValue(0);
	const rotation = useSharedValue(180);

	const toggle = () => {
		setExpanded(!expanded);
		height.value = withTiming(expanded ? 0 : contentHeight, {
			duration: 300,
		});
		rotation.value = withTiming(expanded ? 180 : 270, {
			duration: 300,
		});
	};

	const animatedStyle = useAnimatedStyle(() => ({
		height: height.value,
		overflow: 'hidden',
	}));
	const animatedRotation = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<View style={styles.container}>
			<Pressable onPress={toggle}>
				<Text style={styles.text}>{title}</Text>
				<Animated.View style={[animatedRotation, styles.icon]}>
					<Icon width={8} height={15} />
				</Animated.View>
			</Pressable>
			<View
				style={{
					position: 'absolute',
					opacity: 0,
					pointerEvents: 'none',
				}}
				onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
			>
				<View>{children}</View>
			</View>
			<Animated.View style={[animatedStyle]}>
				<View>{children}</View>
			</Animated.View>
		</View>
	);
};

export default AccordionItem;

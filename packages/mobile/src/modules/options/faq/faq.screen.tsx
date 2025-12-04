import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from 'src/shared/components/screenWrapper/screenWrapper.component';
import AccordionItem from './acardion.item';
import { styles } from './faq.styles';

const FaqScreen = () => {
	return (
		<ScreenWrapper>
			<AccordionItem title="Is it safe to buy from us">
				<Text style={styles.text}>
					There are many variations of passages of Lorem Ipsum
					available, but the majority have suffered alteration in some
					form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a
					passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text.
				</Text>
			</AccordionItem>
			<AccordionItem title="Is it safe to buy from us">
				<Text style={styles.text}>
					There are many variations of passages of Lorem Ipsum
					available, but the majority have suffered alteration in some
					form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a
					passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text.
				</Text>
			</AccordionItem>
			<AccordionItem title="Is it safe to buy from us">
				<Text style={styles.text}>
					There are many variations of passages of Lorem Ipsum
					available, but the majority have suffered alteration in some
					form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a
					passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text.
				</Text>
			</AccordionItem>
			<AccordionItem title="Is it safe to buy from us">
				<Text style={styles.text}>
					There are many variations of passages of Lorem Ipsum
					available, but the majority have suffered alteration in some
					form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a
					passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text.
				</Text>
			</AccordionItem>
		</ScreenWrapper>
	);
};

export default FaqScreen;

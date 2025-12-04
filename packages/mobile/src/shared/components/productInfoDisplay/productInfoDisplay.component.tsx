import React from 'react';
import { Text, View } from 'react-native';
import { Product } from 'src/types/api';
import DialButton from '../dialButton/dialButton.component';
import { styles } from './productInfoDisplay.styles';

type Props = {
	product: Product;
	amount: number;
	setAmount: (amount: number) => void;
};

const ProductInfoDisplay = ({ product, amount, setAmount }: Props) => {
	return (
		<View>
			<View style={styles.infoContainer}>
				<Text style={styles.boldText}>Name:</Text>
				<Text style={styles.text}>{product.name}</Text>
				<Text style={styles.boldText}>Description:</Text>
				<Text style={styles.text}>{product.description}</Text>
				<Text style={styles.boldText}>In Stock:</Text>
				<Text style={styles.text}>{product.stock.toString()}</Text>
				<Text style={styles.boldText}>Price</Text>
				<Text style={styles.text}>{`$${product.price}`}</Text>
				<Text style={styles.boldText}>Category:</Text>
				<Text style={styles.text}>{product.category}</Text>
			</View>
			<View>
				<Text style={styles.boldText}>Amount:</Text>
				<View style={styles.countMenu}>
					<DialButton
						title="-"
						onPress={() => setAmount(amount - 1)}
						style={styles.button}
						textStyle={styles.buttonText}
						disabled={amount <= 1 ? true : false}
					/>
					<View style={styles.countCont}>
						<Text style={styles.count}>{amount.toString()}</Text>
					</View>
					<DialButton
						title="+"
						onPress={() => setAmount(amount + 1)}
						style={styles.button}
						textStyle={styles.buttonText}
						disabled={amount >= product.stock ? true : false}
					/>
				</View>
			</View>
		</View>
	);
};

export default ProductInfoDisplay;

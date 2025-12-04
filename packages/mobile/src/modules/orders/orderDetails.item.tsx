import { Pressable, Text, View } from 'react-native';
import Trash from '../../../assets/images/trash-bin.svg';
import { styles } from './orderDetails.styles';
import { OrderDetail } from 'src/types/api';
import { deleteDetail } from 'src/shared/api/order';

type Props = {
	item: OrderDetail;
	setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
};
// setD((ref)=>ref.filter)

const DetailItem = ({ item, setDetails }: Props) => {
	return (
		<View style={styles.itemContainer}>
			<View style={styles.infoCont}>
				<Text style={styles.text}>{item.product.name}</Text>
				<View style={styles.statCont}>
					<View style={styles.itemTextCont}>
						<Text style={styles.boldText}>Total:</Text>
						<Text
							style={styles.text}
						>{`$${item.price_at_purchase * item.quantity}`}</Text>
					</View>
					<View style={styles.itemTextCont}>
						<Text style={styles.boldText}>Amount:</Text>
						<Text style={styles.text}>
							{item.quantity.toString()}
						</Text>
					</View>
				</View>
			</View>
			<Pressable
				onPress={async () => {
					await deleteDetail(item.order_id, item.id);
					setDetails((ref) =>
						ref.filter((detail) => detail.id != item.id),
					);
				}}
			>
				<Trash width={20} height={20} style={styles.trash} />
			</Pressable>
		</View>
	);
};

export default DetailItem;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { FONTS } from 'src/shared/styles';
import ProductIcon from '../../../../../assets/images/product.svg';
import OrderIcon from '../../../../../assets/images/orders.svg';
import OptionsIcon from '../../../../../assets/images/options.svg';
import { BOTTOM_TABS_OPTIONS } from '../../constants';
import { StyleSheet } from 'react-native';
import RootProduct from '../root-products/root-products.component';
import RootOrders from '../root-orders/root-orders.component';
import { NAVIGATION_KEYS } from '../../types';
import RootOptions from '../root-options/root-options.component';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
	const screens = useMemo(() => {
		return (
			<>
				<Tab.Screen
					name={NAVIGATION_KEYS.PRODUCTS}
					component={RootProduct}
					options={{
						...BOTTOM_TABS_OPTIONS,
						tabBarIcon: ({ color, size }) => (
							<ProductIcon
								width={size}
								height={size}
								color={color}
							/>
						),
					}}
				/>
				<Tab.Screen
					name={NAVIGATION_KEYS.ORDERS}
					component={RootOrders}
					options={{
						...BOTTOM_TABS_OPTIONS,
						title: 'Orders',
						tabBarIcon: ({ color, size }) => (
							<OrderIcon
								width={size}
								height={size}
								color={color}
							/>
						),
					}}
				/>
				<Tab.Screen
					name={NAVIGATION_KEYS.OPTIONS}
					component={RootOptions}
					options={{
						...BOTTOM_TABS_OPTIONS,
						title: 'Settings',
						tabBarIcon: ({ color, size }) => (
							<OptionsIcon
								width={size}
								height={size}
								color={color}
							/>
						),
					}}
				/>
			</>
		);
	}, []);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: styles.font,
				tabBarStyle: styles.tab,
				tabBarItemStyle: styles.item,
			}}
		>
			{screens}
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tab: {
		padding: 10,
		height: 80,
	},
	item: {
		margin: 10,
	},
	font: {
		fontFamily: FONTS.fontFamily,
		fontSize: 16,
		marginTop: 3,
	},
});

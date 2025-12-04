import React from 'react';
import { NAVIGATION_KEYS, ProductStackParamList } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from 'src/modules/product/product/product.screen';
import InfoProduct from 'src/modules/product/product/infoProduct.screen';
import CartScreen from 'src/modules/product/cart/cart.screen';
import EditCartScreen from 'src/modules/product/cart/editCart.screen';
import Cart from 'src/shared/components/cart/cart.component';
import { COLORS, FONTS } from 'src/shared/styles';

const Stack = createNativeStackNavigator<ProductStackParamList>();

const RootProduct = () => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				contentStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				headerBackImageSource: require('../../../../../assets/images/back.png'),
				headerRight: () => <Cart navigation={navigation} />,
				headerStyle: {
					backgroundColor: COLORS.cyanBg,
				},
				headerTitleStyle: {
					fontWeight: '700',
					fontFamily: FONTS.fontFamily,
					fontSize: 24,
				},
				headerShadowVisible: false,
				headerTitleAlign: 'center',
			})}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.PRODUCTS_SCREEN}
				component={ProductScreen}
				options={{ title: 'Products' }}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.INFO_PRODUCT}
				component={InfoProduct}
				options={{
					title: 'Product information',
				}}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.CART}
				component={CartScreen}
				options={{
					title: 'Cart',
				}}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.CART_EDIT}
				component={EditCartScreen}
				options={{
					title: 'Edit Cart Item',
				}}
			/>
		</Stack.Navigator>
	);
};

export default RootProduct;

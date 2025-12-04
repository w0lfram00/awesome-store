export enum NAVIGATION_KEYS {
	LOGIN = 'login',
	REGISTER = 'register',
	VERIFICATION = 'verification',
	PRODUCTS = 'products',
	INFO_PRODUCT = 'product-info',
	ORDERS = 'orders',
	ORDERS_SCREEN = 'order',
	OPTIONS = 'options',
	CART = 'cart',
	CART_EDIT = 'edit-cart',
	MAIN = 'main',
	AUTH = 'auth',
	PRODUCTS_SCREEN = 'product',
	ORDER_DETAILS = 'order-detail',
	PAYMENT_SUCCESS = 'success-payment',
	OPTIONS_SCREEN = 'options-screen',
	PERSONAL_INFO = 'personal-info',
	CHANGE_PASSWORD = 'password',
	FAQ = 'faq',
	FORGOT_PASSWORD = 'forgot-password',
	PASSWORD_RESET_VERIFY = 'password-verify',
	PASSWORD_RESET = 'reset-password',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.AUTH]: { screen: string };
	[NAVIGATION_KEYS.MAIN]: { screen: string };
	[NAVIGATION_KEYS.PASSWORD_RESET]: undefined;
};

export type MainStackParamList = {
	[NAVIGATION_KEYS.PRODUCTS]: { screen: string };
	[NAVIGATION_KEYS.ORDERS]: { screen: string };
	[NAVIGATION_KEYS.OPTIONS]: { screen: string };
};

export type AuthStackParamList = {
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.VERIFICATION]: { email: string; password: string };
	[NAVIGATION_KEYS.PASSWORD_RESET_VERIFY]: { email: string };
	[NAVIGATION_KEYS.REGISTER]: undefined;
	[NAVIGATION_KEYS.FORGOT_PASSWORD]: undefined;
};

export type ProductStackParamList = {
	[NAVIGATION_KEYS.INFO_PRODUCT]: { id: string };
	[NAVIGATION_KEYS.CART]: undefined;
	[NAVIGATION_KEYS.CART_EDIT]: { id: string };
	[NAVIGATION_KEYS.PRODUCTS_SCREEN]: undefined;
};

export type OrdersStackParamList = {
	[NAVIGATION_KEYS.ORDERS_SCREEN]: undefined;
	[NAVIGATION_KEYS.ORDER_DETAILS]: { id: string };
	[NAVIGATION_KEYS.PAYMENT_SUCCESS]: undefined;
};

export type OptionsStackParamList = {
	[NAVIGATION_KEYS.OPTIONS_SCREEN]: undefined;
	[NAVIGATION_KEYS.PERSONAL_INFO]: undefined;
	[NAVIGATION_KEYS.FAQ]: undefined;
	[NAVIGATION_KEYS.CHANGE_PASSWORD]: undefined;
};

export interface RegisterUserDto {
	name: string;
	email: string;
	address: string;
	phone: string;
	password: string;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface SendEmailDto {
	email: string;
}

export interface VerifyEmailDto {
	token: number;
	email: string;
}

export interface User {
	id: string;
	email: string;
	name: string;
	address: string;
	phone: string;
	role: 'ADMIN' | 'USER';
}

export interface LoginResponse {
	accessToken: string;
	userId: string;
}

export interface ProductPreview {
	id: string;
	name: string;
	price: number;
	category: string;
}

export type ProductsList = { data: ProductPreview[] };

export interface Product extends ProductPreview {
	description: string;
	stock: number;
}

export type PaymentStatus = 'COMPLETE' | 'FAILED' | 'PENDING';

export type DeliveryStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';

export type SortBy = 'ASC' | 'DESC';

export interface Order {
	id: string;
	userId: string;
	total_amount: number;
	payment_status: PaymentStatus;
	delivery_status: DeliveryStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderDetail {
	id: string;
	product: Product;
	quantity: number;
	price_at_purchase: number;
	order_id: string;
	product_id: string;
}

export type CreateOrderDetailDto = Omit<OrderDetail, 'order_id' | 'id'>;

export type GetOrderQuery = Partial<{
	payment_status: PaymentStatus;
	delivery_status: DeliveryStatus;
	sort: string;
}>;

export interface Payment {
	id: string;
	order_id: string;
	total_amount: number;
	payment_status: PaymentStatus;
	transaction_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export type UpdateUserDataDto = Partial<{
	name: string;
	address: string;
	phone: string;
}>;

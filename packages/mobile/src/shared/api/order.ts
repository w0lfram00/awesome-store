import {
	CreateOrderDetailDto,
	GetOrderQuery,
	Order,
	OrderDetail,
	Payment,
} from 'src/types/api';
import { httpFactory } from './httpFactory';

const orderHttp = httpFactory.createAuthHttpService();

export const createOrder = async () => {
	const response = await orderHttp.post<Order, undefined>(
		'orders',
		undefined,
	);

	return response;
};

export const getAllOrders = async (query?: GetOrderQuery) => {
	const response = await orderHttp.get<{ data: Order[] }>('orders', {
		params: query,
	});

	return response.data;
};

export const getOrderById = async (id: string) => {
	const response = await orderHttp.get<Order>('orders/' + id);

	return response;
};

export const addDetailToOrder = async (
	order_id: string,
	createDto: CreateOrderDetailDto,
) => {
	const response = await orderHttp.post<OrderDetail, CreateOrderDetailDto>(
		`orders/${order_id}/items`,
		createDto,
	);

	return response;
};

export const getDetailOfOrder = async (order_id: string) => {
	const response = await orderHttp.get<{ data: OrderDetail[] }>(
		`orders/${order_id}/items`,
	);

	return response.data;
};

export const getDetailById = async (order_id: string, id: string) => {
	const response = await orderHttp.get<OrderDetail>(
		`orders/${order_id}/items/${id}`,
	);

	return response;
};

export const deleteDetail = async (order_id: string, id: string) => {
	await orderHttp.delete<OrderDetail>(`orders/${order_id}/items/${id}`);
};

export const updateDetail = async (
	order_id: string,
	id: string,
	updateDto: { quantity: number },
) => {
	const response = await orderHttp.patch<OrderDetail, { quantity: number }>(
		`orders/${order_id}/items/${id}`,
		updateDto,
	);

	return response;
};

export const payOrder = async (order_id: string, total_amount: number) => {
	const response = await orderHttp.post<
		Payment,
		{ total_amount: number; order_id: string }
	>('payment', { total_amount, order_id });

	return response;
};

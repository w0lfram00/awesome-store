import { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { createOrder, getDetailOfOrder, getOrderById } from '../api/order';

export const useOrder = () => {
	const order_id = useUserStore((state) => state.curOrder);
	const order = useUserStore((state) => state.order);
	const details = useUserStore((state) => state.details);

	useEffect(() => {
		const eff = async () => {
			let id = order_id;

			if (!id) {
				const newOrder = await createOrder();
				id = newOrder.id;
				useUserStore.getState().setCurOrder(id);
			}

			const [orderResult, detailResult] = await Promise.all([
				getOrderById(id),
				getDetailOfOrder(id),
			]);
			useUserStore.getState().setOrder(orderResult);
			useUserStore.getState().setDetails(detailResult);
		};

		eff();
	}, [order_id]);

	return {
		order,
		details,
		setOrder: useUserStore.getState().setOrder,
		setDetails: useUserStore.getState().setDetails,
		addDetail: useUserStore.getState().addDetail,
		deleteDetail: useUserStore.getState().deleteDetail,
	};
};

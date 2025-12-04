import { PaymentStatus } from '@/db/generated/client/enums';

export const createPayment = (order_id: string, total_amount: number) => {
	const success = Math.random() > 0.4;
	const payment_status = success ? 'COMPLETE' : 'FAILED';
	const transaction_id = crypto.randomUUID();

	return {
		order_id,
		payment_status: payment_status as PaymentStatus,
		transaction_id,
		total_amount,
	};
};

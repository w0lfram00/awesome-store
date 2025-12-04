import { CreatePaymentDto } from '@/interfaces/payment';
import { OrderService } from '@/services/Order.service';
import { PaymentService } from '@/services/Payment.service';
import { createPayment } from '@/utils/createPayment';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import createHttpError from 'http-errors';

@Controller('payment')
export class PaymentController {
	constructor(
		private readonly paymentService: PaymentService,
		private readonly orderService: OrderService,
	) {}

	@Post()
	async pay(@Body() createDto: CreatePaymentDto) {
		const payment = await this.paymentService.create(
			createPayment(createDto.order_id, createDto.total_amount),
		);
		await this.orderService.update(payment.order_id, {
			payment_status: payment.payment_status,
		});
		if (payment.payment_status == 'FAILED')
			throw createHttpError(402, 'Payment declined');

		return payment;
	}

	@Delete(':id')
	async delete(@Param('id', isExistPipe) id: string) {
		return await this.paymentService.delete(id);
	}
}

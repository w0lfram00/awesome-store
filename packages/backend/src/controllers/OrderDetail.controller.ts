import { CreateOrderDetailDto, UpdateOrderDetailDto } from '@/interfaces/order';
import { OrderService } from '@/services/Order.service';
import { OrderDetailService } from '@/services/OrderDetails.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import createHttpError from 'http-errors';

@Controller('orders/:orderId/items')
export class OrderDetailController {
	constructor(
		private readonly orderDetailService: OrderDetailService,
		private readonly orderService: OrderService,
	) {}

	@Post()
	async create(
		@Param('orderId') order_id: string,
		@Body() createDto: CreateOrderDetailDto,
	) {
		if (!(await this.orderService.getById(order_id)))
			throw createHttpError(404, 'Order does not exist');
		const detail = await this.orderDetailService.create(
			order_id,
			createDto,
		);
		const addedTotal = detail.price_at_purchase * detail.quantity;
		await this.orderService.update(order_id, {
			total_amount: addedTotal,
		});
		return detail;
	}

	@Patch(':id')
	async update(
		@Body() updateDto: UpdateOrderDetailDto,
		@Param('id', isExistPipe) id: string,
	) {
		let prevDetail;
		if (updateDto.quantity)
			prevDetail = await this.orderDetailService.getById(id);

		const detail = await this.orderDetailService.update(id, updateDto);

		if (updateDto.quantity && prevDetail) {
			const addedTotal =
				detail.price_at_purchase *
				(detail.quantity - prevDetail?.quantity);
			await this.orderService.update(detail.order_id, {
				total_amount: addedTotal,
			});
		}
		return detail;
	}

	@Delete(':id')
	async delete(
		@Param('id', isExistPipe) id: string,
		@Param('orderId') order_id: string,
	) {
		if (!(await this.orderService.getById(order_id)))
			throw createHttpError(404, 'Order does not exist');

		const detail = await this.orderDetailService.delete(id);
		const addedTotal = detail.price_at_purchase * detail.quantity * -1;
		await this.orderService.update(detail.order_id, {
			total_amount: addedTotal,
		});
		return { id: detail.id };
	}

	@Get()
	async getAll(@Param('orderId') order_id: string) {
		const details = await this.orderDetailService.getAll(order_id);
		return { data: details };
	}

	@Get(':id')
	async getById(@Param('id', isExistPipe) id: string) {
		const detail = await this.orderDetailService.getById(id);
		return detail;
	}
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma.service';
import { GetOrderQuery, UpdateOrderDto } from '@/interfaces/order';
import { OrderDetailService } from './OrderDetails.service';

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly orderDetailService: OrderDetailService,
	) {}

	async create(userId: string) {
		const order = await this.prisma.order.create({
			data: {
				user: { connect: { id: userId } },
			},
		});
		return order;
	}

	async update(id: string, updateDto: UpdateOrderDto & { userId?: string }) {
		let prevOrder;
		if (updateDto.total_amount) {
			prevOrder = await this.prisma.order.findFirst({
				where: { id },
				select: { total_amount: true },
			});
			updateDto.total_amount += prevOrder?.total_amount || 0;
		}

		const order = await this.prisma.order.update({
			data: {
				userId: updateDto.userId,
				total_amount: updateDto.total_amount,
				payment_status: updateDto.payment_status,
				updatedAt: new Date(),
			},
			where: { id },
		});

		return order;
	}

	async delete(id: string) {
		await this.prisma.order.delete({ where: { id } });
		return;
	}

	async getAllOfUser(userId: string, query: GetOrderQuery) {
		const orders = await this.prisma.order.findMany({
			where: {
				userId,
				payment_status: query.payment_status,
				delivery_status: query.delivery_status,
			},
			orderBy: { createdAt: query.sort },
		});
		return orders;
	}

	async getById(id: string) {
		const order = await this.prisma.order.findFirst({
			where: { id },
		});
		const detail = this.orderDetailService.getById(id);
		return order;
	}
}

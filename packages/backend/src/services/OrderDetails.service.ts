import { Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma.service';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from '@/interfaces/order';

@Injectable()
export class OrderDetailService {
	constructor(private readonly prisma: PrismaService) {}

	async create(order_id: string, createDto: CreateOrderDetailDto) {
		const orderDetail = await this.prisma.orderDetail.create({
			data: {
				quantity: createDto.quantity,
				price_at_purchase: createDto.price_at_purchase,
				order: { connect: { id: order_id } },
				product: { connect: { id: createDto.product_id } },
			},
			include: { product: true },
		});

		return orderDetail;
	}

	async update(id: string, updateDto: UpdateOrderDetailDto) {
		const orderDetail = await this.prisma.orderDetail.update({
			data: updateDto,
			where: { id },
		});

		return orderDetail;
	}

	async delete(id: string) {
		return await this.prisma.orderDetail.delete({
			where: { id },
		});
	}

	async getAll(order_id: string) {
		const orderDetails = await this.prisma.orderDetail.findMany({
			where: { order_id },
			include: {
				product: true,
			},
		});
		return orderDetails;
	}

	async getById(id: string) {
		const orderDetail = await this.prisma.orderDetail.findFirst({
			where: { id },
			include: {
				product: true,
			},
		});
		return orderDetail;
	}
}

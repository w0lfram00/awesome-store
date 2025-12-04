import { Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma.service';
import { OrderService } from './Order.service';
import { CreatePaymentDto } from '@/interfaces/payment';
import { PaymentStatus } from '@/db/generated/client/enums';

@Injectable()
export class PaymentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		createDto: CreatePaymentDto & {
			payment_status: PaymentStatus;
			transaction_id: string;
		},
	) {
		const payment = await this.prisma.payment.create({ data: createDto });
		return payment;
	}

	async delete(id: string) {
		const payment = await this.prisma.payment.delete({ where: { id } });
		return payment.id;
	}
}

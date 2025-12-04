import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DeliveryStatus, PaymentStatus } from '@/db/generated/client/enums';

export class UpdateOrderDto {
	@IsEnum(PaymentStatus)
	payment_status?: PaymentStatus;
	@IsInt()
	total_amount?: number;
}

export class CreateOrderDetailDto {
	@IsUUID()
	product_id: string;
	@IsInt()
	quantity: number;
	@IsInt()
	price_at_purchase: number;
}

export class UpdateOrderDetailDto {
	@IsInt()
	quantity: number;
}

export type GetOrderQuery = Partial<{
	payment_status: PaymentStatus;
	delivery_status: DeliveryStatus;
	sort: 'asc' | 'desc';
}>;

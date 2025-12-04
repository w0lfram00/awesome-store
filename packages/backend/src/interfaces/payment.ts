import { PaymentStatus } from '@/db/generated/client/enums';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
	@IsInt()
	total_amount: number;
	@IsUUID()
	order_id: string;
}

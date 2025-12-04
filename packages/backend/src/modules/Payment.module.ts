import { DB_NAMES } from '@/constants';
import { PaymentController } from '@/controllers/Payment.controller';
import { OrderService } from '@/services/Order.service';
import { OrderDetailService } from '@/services/OrderDetails.service';
import { PaymentService } from '@/services/Payment.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Module } from '@nestjs/common';

@Module({
	controllers: [PaymentController],
	providers: [
		PaymentService,
		OrderService,
		OrderDetailService,
		isExistPipe,
		{
			provide: 'dbName',
			useValue: DB_NAMES.PAYMENT,
		},
	],
})
export class PaymentModule {}

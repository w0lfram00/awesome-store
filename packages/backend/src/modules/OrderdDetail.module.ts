import { DB_NAMES } from '@/constants';
import { OrderDetailController } from '@/controllers/OrderDetail.controller';
import { OrderService } from '@/services/Order.service';
import { OrderDetailService } from '@/services/OrderDetails.service';
import { PrismaService } from '@/services/Prisma.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Module } from '@nestjs/common';

@Module({
	controllers: [OrderDetailController],
	providers: [
		OrderDetailService,
		OrderService,
		PrismaService,
		isExistPipe,
		{
			provide: 'dbName',
			useValue: DB_NAMES.ORDER_DETAIL,
		},
	],
})
export class OrderDetailModule {}

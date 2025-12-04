import { DB_NAMES } from '@/constants';
import { OrderController } from '@/controllers/Order.controller';
import { OrderService } from '@/services/Order.service';
import { OrderDetailService } from '@/services/OrderDetails.service';
import { PrismaService } from '@/services/Prisma.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Module } from '@nestjs/common';

@Module({
	controllers: [OrderController],
	providers: [
		OrderService,
		OrderDetailService,
		PrismaService,
		isExistPipe,
		{
			provide: 'dbName',
			useValue: DB_NAMES.ORDER,
		},
	],
})
export class OrderModule {}

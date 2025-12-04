import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './Prisma.module';
import { AuthModule } from './Auth.module';
import { ProductModule } from './Product.module';
import { OrderModule } from './Order.module';
import { OrderDetailModule } from './OrderdDetail.module';
import { LoggerMiddleware } from '@/utils/logger.middleware';
import { OrderController } from '@/controllers/Order.controller';
import { PaymentModule } from './Payment.module';
import { PaymentController } from '@/controllers/Payment.controller';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		ProductModule,
		OrderModule,
		OrderDetailModule,
		PaymentModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(PaymentController);
	}
}

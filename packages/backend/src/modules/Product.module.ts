import { DB_NAMES } from '@/constants';
import { ProductController } from '@/controllers/Product.controller';
import { ProductService } from '@/services/Product.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Module } from '@nestjs/common';

@Module({
	controllers: [ProductController],
	providers: [
		ProductService,
		isExistPipe,
		{
			provide: 'dbName',
			useValue: DB_NAMES.PRODUCT,
		},
	],
})
export class ProductModule {}

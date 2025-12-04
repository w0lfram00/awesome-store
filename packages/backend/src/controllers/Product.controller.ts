import { DB_NAMES, ROLES } from '@/constants';
import { UserData } from '@/interfaces/auth';
import {
	CreateProductDto,
	getProductQuery,
	UpdateProductDto,
} from '@/interfaces/product';
import { ProductService } from '@/services/Product.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { parseGetProductsQuery } from '@/utils/parseGetProductsQuery.pipe';
import { Roles } from '@/utils/roles.decorator';
import { RolesGuard } from '@/utils/roles.guard';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(RolesGuard)
	@Roles(ROLES.ADMIN)
	@Post()
	async create(@Body() createDto: CreateProductDto) {
		const product = await this.productService.create(createDto);
		return product;
	}

	@UseGuards(RolesGuard)
	@Roles(ROLES.ADMIN)
	@Patch(':id')
	async update(
		@Body() updateDto: UpdateProductDto,
		@Param('id', isExistPipe) id: string,
	) {
		const product = await this.productService.update(id, updateDto);
		return product;
	}

	@UseGuards(RolesGuard)
	@Roles(ROLES.ADMIN)
	@Delete(':id')
	async delete(@Param('id', isExistPipe) id: string) {
		const product = await this.productService.delete(id);
		return { id: product.id };
	}

	@Get()
	async getAll(@Query(parseGetProductsQuery) query: getProductQuery) {
		const products = await this.productService.getAll(query);
		return { data: products };
	}

	@Get(':id')
	async getById(@Param('id', isExistPipe) id: string) {
		const product = await this.productService.getById(id);
		return product;
	}
}

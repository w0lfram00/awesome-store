import { Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma.service';
import {
	CreateProductDto,
	getProductQuery,
	UpdateProductDto,
} from '@/interfaces/product';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createDto: CreateProductDto) {
		const product = await this.prisma.product.create({ data: createDto });
		return product;
	}

	async update(id: string, updateDto: UpdateProductDto) {
		const product = await this.prisma.product.update({
			data: updateDto,
			where: { id },
		});

		return product;
	}

	async delete(id: string) {
		return await this.prisma.product.delete({ where: { id } });
	}

	async getAll({ page = 1, pageSize = 10, sort, query }: getProductQuery) {
		const products = await this.prisma.product.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { price: sort },
			where: {
				name: {
					contains: query,
				},
			},
			select: { id: true, name: true, price: true, category: true },
		});
		return products;
	}

	async getById(id: string) {
		const product = await this.prisma.product.findFirst({ where: { id } });
		return product;
	}
}

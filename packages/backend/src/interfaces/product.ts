import { IsInt, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
	@IsString()
	name: string;
	@IsString()
	description: string;
	@IsInt()
	stock: number;
	@IsInt()
	price: number;
	@IsString()
	category: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export type getProductQuery = Partial<{
	page: number;
	pageSize: number;
	sort: 'asc' | 'desc';
	query: string;
}>;

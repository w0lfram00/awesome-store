import { UserData } from '@/interfaces/auth';
import { GetOrderQuery, UpdateOrderDto } from '@/interfaces/order';
import { OrderService } from '@/services/Order.service';
import { isExistPipe } from '@/utils/isExist.pipe';
import { Roles } from '@/utils/roles.decorator';
import { GetUser } from '@/utils/user.decorator';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async startOrder(@GetUser() user: UserData) {
		const order = await this.orderService.create(user.id);
		return order;
	}

	@Patch(':id')
	async update(
		@Body() updateDto: UpdateOrderDto,
		@Param('id', isExistPipe) id: string,
	) {
		const order = await this.orderService.update(id, updateDto);
		return order;
	}

	@HttpCode(204)
	@Roles('ADMIN')
	@Delete(':id')
	async delete(@Param('id', isExistPipe) id: string) {
		await this.orderService.delete(id);
		return;
	}

	@Get()
	async getAll(@GetUser() user: UserData, @Query() query: GetOrderQuery) {
		const orders = await this.orderService.getAllOfUser(user.id, query);
		return { data: orders };
	}

	@Get(':id')
	async getById(@Param('id', isExistPipe) id: string) {
		const order = await this.orderService.getById(id);
		return order;
	}
}

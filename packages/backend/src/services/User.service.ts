import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma.service';
import createHttpError from 'http-errors';
import { Request } from 'express';
import { RegisterUserDto, UpdateUserDto, UserData } from '@/interfaces/auth';
import { User } from '@/db/generated/client/client';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserByEmail(email: string) {
		return await this.prisma.user.findFirst({
			where: { email },
		});
	}

	async createUser(userDto: RegisterUserDto) {
		return await this.prisma.user.create({
			data: { ...userDto },
		});
	}

	async updateUser(id: string, updateDto: Partial<User>) {
		return await this.prisma.user.update({
			where: { id },
			data: updateDto,
		});
	}

	async deleteUser(id: string) {
		return await this.prisma.user.delete({ where: { id } });
	}
}

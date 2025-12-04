import { DB_NAMES } from '@/constants';
import { PrismaService } from '@/services/Prisma.service';
import {
	ArgumentMetadata,
	Inject,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import createHttpError from 'http-errors';
import { PrismaClient } from '@/db/generated/client/client';

@Injectable()
export class isExistPipe implements PipeTransform {
	constructor(
		private readonly prisma: PrismaService,
		@Inject('dbName') private readonly dbName: DB_NAMES,
	) {}

	async transform(value: string, metadata: ArgumentMetadata) {
		if (isUuid(value) && (await this.findInDb(value))) return value;
		else throw createHttpError(400, `Resource with id ${value} not found.`);
	}

	private async findInDb(value: string) {
		const result = await (
			this.prisma[this.dbName] as PrismaClient['user']
		).findFirst({
			where: { id: value },
		});

		return Boolean(result);
	}
}

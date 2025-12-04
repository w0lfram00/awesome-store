import { PrismaService } from '@/services/Prisma.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}

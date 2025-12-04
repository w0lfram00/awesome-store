import { Module } from '@nestjs/common';
import { AuthService } from '@/services/Auth.service';
import { AuthController } from '@/controllers/Auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AtStrategy } from '@/utils/auth.strategy';
import { UserModule } from './User.module';
import { EmailModule } from './Email.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@/utils/auth.guard';
import { RtStrategy } from '@/utils/refresh.strategy';

@Module({
	imports: [UserModule, EmailModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtService,
		AtStrategy,
		RtStrategy,
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
	],
})
export class AuthModule {}

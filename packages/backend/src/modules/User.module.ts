import { UserController } from '@/controllers/User.controller';
import { UserService } from '@/services/User.service';
import { AtGuard } from '@/utils/auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [UserController],
	providers: [UserService, JwtService],
	exports: [UserService],
})
export class UserModule {}

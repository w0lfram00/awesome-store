import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Role } from '@prisma/client';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterUserDto {
	@IsString()
	name: string;
	@IsEmail()
	email: string;
	@IsString()
	@Length(12)
	address: string;
	@IsPhoneNumber()
	phone: string;
	@IsString()
	@Length(8, 16)
	password: string;
}

export class LoginUserDto {
	@IsEmail()
	email: string;
	@IsString()
	@Length(8, 16)
	password: string;
}

export interface RefreshUserDto {
	sessionId: string;
	refreshToken: string;
}

export interface UserData {
	email: string;
	id: string;
	name: string;
	phone: string;
	address: string;
	role: Role;
}

export class UpdateUserDto extends PartialType(
	OmitType(RegisterUserDto, ['password'] as const),
) {}

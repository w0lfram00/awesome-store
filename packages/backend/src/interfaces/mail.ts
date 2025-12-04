import { IsEmail, IsInt, IsJWT, IsUUID } from 'class-validator';

export interface sendMailOptions {
	to: string;
	from?: string;
	subject: string;
	html: string;
	text?: string;
}

export class SendEmailDto {
	@IsEmail()
	email: string;
}

export class VerifyEmailDto {
	@IsInt()
	token: number;
	@IsEmail()
	email: string;
}

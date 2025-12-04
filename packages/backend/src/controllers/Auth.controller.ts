import { THIRTY_DAYS } from '@/constants';
import { LoginUserDto, RegisterUserDto } from '@/interfaces/auth';
import { SendEmailDto, VerifyEmailDto } from '@/interfaces/mail';
import { AuthService } from '@/services/Auth.service';
import { UserService } from '@/services/User.service';
import { GetRefreshToken, GetRt } from '@/utils/getRt.decorator';
import { Public } from '@/utils/public.decorator';
import { RtGuard } from '@/utils/refresh.guard';
import { GetUser } from '@/utils/user.decorator';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import createHttpError from 'http-errors';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('register')
	async register(@Body() registerDto: RegisterUserDto) {
		const user = await this.authService.register(registerDto);
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		};
	}

	@Public()
	@Post('login')
	async login(@Body() loginDto: LoginUserDto, @Res() res: Response) {
		const response = await this.authService.login(loginDto);

		res.cookie('refreshToken', response.refreshToken, {
			httpOnly: true,
			maxAge: THIRTY_DAYS,
		});

		res.status(201).json({
			accessToken: response.accessToken,
			userId: response.userId,
		});
	}

	@Public()
	@Post('send-verify-email')
	async sendVerifyEmail(@Body() { email }: SendEmailDto) {
		await this.authService.sendVerifyEmail(email);
		return { message: 'Verification email was sent' };
	}

	@Public()
	@Post('verify-email')
	async verifyEmail(@Body() verifyDto: VerifyEmailDto) {
		await this.authService.verifyEmail(verifyDto);
		return { message: 'Email verified' };
	}

	@Post('logout')
	async logout(@Res() res: Response) {
		res.clearCookie('responseId');
		res.clearCookie('refreshToken');

		res.status(204).send();
	}

	@Public()
	@Post('verify-password-email')
	async verifyPasswordReset(@Body() verifyDto: VerifyEmailDto) {
		await this.authService.verifyEmail(verifyDto);
		const response = await this.authService.noPasswordLogin(
			verifyDto.email,
		);
		return {
			accessToken: response.accessToken,
			userId: response.userId,
		};
	}

	@Public()
	@UseGuards(RtGuard)
	@Post('refresh')
	async refresh(@Res() res: Response, @GetRt() user: GetRefreshToken) {
		const response = await this.authService.refresh(
			user.email,
			user.refreshToken,
		);

		res.cookie('refreshToken', response.refreshToken, {
			httpOnly: true,
			maxAge: THIRTY_DAYS,
		});

		res.status(201).json({
			accessToken: response.accessToken,
			userId: response.userId,
		});
	}
}

import { Injectable } from '@nestjs/common';
import { hash } from 'crypto';
import createHttpError from 'http-errors';
import { PrismaService } from './Prisma.service';
import { LoginUserDto, RegisterUserDto, UserData } from '@/interfaces/auth';
import { EmailService } from './Email.service';
import { getEnv } from '@/utils/getEnv';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './User.service';
import { VerifyEmailDto } from '@/interfaces/mail';
import { THIRTY_MINUTES } from '@/constants';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly user: UserService,
		private readonly sgMail: EmailService,
		private readonly jwtService: JwtService,
	) {}

	async sendVerifyEmail(userEmail: string) {
		const user = await this.user.getUserByEmail(userEmail);
		if (!user) throw createHttpError(404, 'User not found');

		await this.prisma.verifyToken.deleteMany({
			where: { email: userEmail },
		});

		const verifyToken = Math.floor(Math.random() * 9000 + 1000);

		await this.prisma.verifyToken.create({
			data: {
				email: user.email,
				token: verifyToken,
				user: { connect: { id: user.id } },
			},
		});

		return await this.sgMail.sendMail({
			to: userEmail,
			subject: 'Email verify',
			html: `<p>Your code: <strong>${verifyToken}</strong></p>`,
		});
	}

	async verifyEmail(verifyDto: VerifyEmailDto) {
		const user = await this.user.getUserByEmail(verifyDto.email);
		if (!user) throw createHttpError(404, 'User not found');

		if (
			verifyDto.token ==
			(
				await this.prisma.verifyToken.findFirst({
					where: { email: verifyDto.email },
				})
			)?.token
		) {
			await this.prisma.verifyToken.deleteMany({
				where: { email: verifyDto.email },
			});
			await this.prisma.user.update({
				where: { id: user.id },
				data: { isVerified: true },
			});
		} else throw createHttpError(401, 'Token is invalid.');
	}

	async register(registerDto: RegisterUserDto): Promise<UserData> {
		const user = await this.user.getUserByEmail(registerDto.email);
		if (user) throw createHttpError(409, 'Email is in use');

		const hashedPassword = hash('sha256', registerDto.password);

		const newUser = await this.user.createUser({
			...registerDto,
			password: hashedPassword,
		});
		return {
			email: newUser.email,
			id: newUser.id,
			name: newUser.name,
			phone: newUser.phone,
			address: newUser.address,
			role: newUser.role,
		};
	}

	async login(loginDto: LoginUserDto) {
		const user = await this.user.getUserByEmail(loginDto.email);
		if (!user) throw createHttpError(404, 'User not found');

		if (!user.isVerified)
			throw createHttpError(401, 'User is not verified');

		const isEqual = hash('sha256', loginDto.password) == user.password;
		if (!isEqual) throw createHttpError(401, 'Unauthorized');

		const { accessToken, refreshToken } = await this.makeTokens(user);
		const hashed_rt = hash('sha256', refreshToken);
		await this.prisma.user.update({
			where: { id: user.id },
			data: { hashed_rt },
		});

		return { userId: user.id, accessToken, refreshToken };
	}

	async refresh(userEmail: string, token: string) {
		const user = await this.user.getUserByEmail(userEmail);
		const isEqual = hash('sha256', token) == user?.hashed_rt;
		if (!isEqual) throw createHttpError(403, 'Unauthorized');

		const { accessToken, refreshToken } = await this.makeTokens(user);

		const hashed_rt = hash('sha256', refreshToken);
		await this.prisma.user.update({
			where: { id: user.id },
			data: { hashed_rt },
		});

		return { userId: user.id, accessToken, refreshToken };
	}

	async noPasswordLogin(email: string) {
		const user = await this.user.getUserByEmail(email);
		if (!user) throw createHttpError(404, 'User not found');
		console.log(user);

		const { accessToken, refreshToken } = await this.makeTokens(user);
		const hashed_rt = hash('sha256', refreshToken);
		await this.prisma.user.update({
			where: { id: user.id },
			data: { hashed_rt },
		});

		return { userId: user.id, accessToken, refreshToken };
	}

	// async sendResetPasswordEmail(userEmail: string) {
	// 	const user = await this.user.getUserByEmail(userEmail);
	// 	if (!user) throw createHttpError(404, 'User not found');

	// 	await this.prisma.verifyToken.deleteMany({
	// 		where: { email: userEmail },
	// 	});

	// 	const verifyToken = Math.floor(Math.random() * 9000 + 1000);

	// 	await this.prisma.verifyToken.create({
	// 		data: {
	// 			email: user.email,
	// 			token: verifyToken,
	// 			user: { connect: { id: user.id } },
	// 		},
	// 	});

	// 	return await this.sgMail.sendMail({
	// 		to: userEmail,
	// 		subject: 'Password reset code',
	// 		html: `<p>Your code: <strong>${verifyToken}</strong></p>`,
	// 	});
	// }

	private async makeTokens(user: UserData) {
		const accessToken = await this.jwtService.signAsync(
			{
				sub: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				address: user.address,
				role: user.role,
			},
			{
				secret: getEnv('JWT_SECRET_ACCESS'),
				expiresIn: THIRTY_MINUTES,
			},
		);
		const refreshToken = await this.jwtService.signAsync(
			{
				sub: user.id,
				email: user.email,
			},
			{
				secret: getEnv('JWT_SECRET_ACCESS'),
			},
		);
		return { accessToken, refreshToken };
	}
}

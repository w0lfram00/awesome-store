import { httpFactory } from './httpFactory';
import {
	LoginResponse,
	LoginUserDto,
	RegisterUserDto,
	SendEmailDto,
	User,
	VerifyEmailDto,
} from '../../types/api';
import { useAuthStore } from '../store/useAuthStore';

const authHttp = httpFactory.createHttpService();

export const registerUser = async (data: RegisterUserDto): Promise<User> => {
	const response = await authHttp.post<User, RegisterUserDto>(
		'auth/register',
		data,
	);

	return response;
};

export const loginUser = async (data: LoginUserDto) => {
	const response = await authHttp.post<LoginResponse, LoginUserDto>(
		'auth/login',
		data,
	);

	useAuthStore.getState().setToken(response.accessToken);
	return response;
};

export const sendVerifyEmail = async (data: SendEmailDto): Promise<string> => {
	return await authHttp.post<string, SendEmailDto>(
		'auth/send-verify-email',
		data,
	);
};

export const verifyEmailReq = async (data: VerifyEmailDto): Promise<string> => {
	return await authHttp.post<string, VerifyEmailDto>(
		'auth/verify-email',
		data,
	);
};

export const refreshUser = async () => {
	return await authHttp.post<LoginResponse, undefined>(
		'auth/refresh',
		undefined,
	);
};

export const logoutUser = async () => {
	return await authHttp.post<undefined, undefined>('auth/logout', undefined);
};

export const verifyPasswordEmail = async (data: VerifyEmailDto) => {
	const response = await authHttp.post<LoginResponse, VerifyEmailDto>(
		'auth/verify-password-email',
		data,
	);
	console.log(response.accessToken);

	useAuthStore.getState().setToken(response.accessToken);
	return response;
};

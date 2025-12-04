import { LoginResponse, UpdateUserDataDto, User } from 'src/types/api';
import { httpFactory } from './httpFactory';

const userHttp = httpFactory.createAuthHttpService();

export const getCurUser = async () => {
	const response = await userHttp.get<User>('users');

	return response;
};

export const deleteCurUser = async () => {
	const response = await userHttp.delete<string>('users');

	return response;
};

export const updateUserData = async (updateDto: UpdateUserDataDto) => {
	const response = await userHttp.patch<LoginResponse, UpdateUserDataDto>(
		'users',
		updateDto,
	);

	return response;
};

export const updateUserPassword = async (
	password: string,
	newPassword: string,
) => {
	const response = await userHttp.patch<
		undefined,
		{ password: string; newPassword: string }
	>('users/password', { password, newPassword });

	return response;
};

export const resetUserPassword = async (password: string) => {
	const response = await userHttp.patch<undefined, { password: string }>(
		'users/password/reset',
		{ password },
	);

	return response;
};

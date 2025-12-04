import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { LoginResponse } from 'src/types/api';

export const mainAxios = axios.create({
	withCredentials: true,
	transformResponse: [
		(data) => {
			const parsed = JSON.parse(data);
			if (parsed.createdAt) parsed.createdAt = new Date(parsed.createdAt);
			if (parsed.updatedAt) parsed.updatedAt = new Date(parsed.updatedAt);
			return parsed;
		},
	],
});

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (error: unknown) => void;
	config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown, token?: string) => {
	failedQueue.forEach(({ resolve, reject, config }) => {
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
			resolve(mainAxios(config));
		} else {
			reject(error);
		}
	});
	failedQueue = [];
};

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({
						resolve,
						reject,
						config: originalRequest,
					});
				});
			}

			isRefreshing = true;

			try {
				const response = await mainAxios.post<LoginResponse>(
					'http://10.0.2.2:3030/auth/refresh',
				);
				const accessToken = response.data.accessToken;
				useAuthStore.getState().setToken(accessToken);

				processQueue(null, accessToken);
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${accessToken}`,
				};
				return mainAxios(originalRequest);
			} catch (err) {
				useAuthStore.getState().logout();
				processQueue(err);
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

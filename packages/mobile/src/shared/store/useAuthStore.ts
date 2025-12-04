import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

type StoreState = {
	token: string | null;
	isAuth: boolean;
	setToken: (token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<StoreState>()(
	persist(
		(set) => ({
			token: null,
			isAuth: false,
			setToken: (token) => set({ token, isAuth: true }),
			logout: () => set({ token: null, isAuth: false }),
		}),
		{
			name: STORAGE_KEYS.auth,
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

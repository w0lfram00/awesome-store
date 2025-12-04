import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderDetail } from 'src/types/api';

type StoreState = {
	curOrder: string;
	setCurOrder: (id: string) => void;
	order: Order | null;
	details: OrderDetail[];
	setOrder: (order: Order) => void;
	setDetails: (details: OrderDetail[]) => void;
	addDetail: (detail: OrderDetail) => void;
	deleteDetail: (id: string) => void;
};

export const useUserStore = create<StoreState>()(
	persist(
		(set) => ({
			curOrder: '',
			setCurOrder: (id) => set({ curOrder: id }),
			order: null,
			details: [],
			setOrder: (order) => set({ order }),
			setDetails: (details) => set({ details }),
			addDetail: (detail) =>
				set((state) => ({
					details: [...state.details, detail],
				})),
			deleteDetail: (id) =>
				set((state) => ({
					details: state.details.filter((item) => item.id != id),
				})),
		}),
		{
			name: STORAGE_KEYS.user,
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

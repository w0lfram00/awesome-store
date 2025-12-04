import { Product, ProductsList } from 'src/types/api';
import { httpFactory } from './httpFactory';

const productHttp = httpFactory.createAuthHttpService();

export const getAllProducts = async ({
	query,
	page,
	perPage = 15,
	sort,
}: Partial<{
	query: string;
	page: number;
	perPage: number;
	sort: 'asc' | 'desc' | null;
}>) => {
	const response = await productHttp.get<ProductsList>('products', {
		params: {
			query,
			page,
			perPage,
			sort,
		},
	});

	return response.data;
};

export const getProductById = async (id: string) => {
	const response = await productHttp.get<Product>(`products/${id}`);

	return response;
};

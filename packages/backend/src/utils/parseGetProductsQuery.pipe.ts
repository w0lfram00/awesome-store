import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class parseGetProductsQuery implements PipeTransform {
	async transform(query: Record<string, string>, metadata: ArgumentMetadata) {
		const page = query.page
			? parseInt(query.page as string, 10)
			: undefined;
		const pageSize = query.pageSize
			? parseInt(query.pageSize as string, 10)
			: undefined;
		const sort =
			query.sort === 'asc' || query.sort === 'desc'
				? query.sort
				: undefined;
		const search =
			typeof query.query === 'string' ? query.query : undefined;

		return {
			page: isNaN(page!) ? undefined : page,
			pageSize: isNaN(pageSize!) ? undefined : pageSize,
			sort,
			query: search,
		};
	}
}

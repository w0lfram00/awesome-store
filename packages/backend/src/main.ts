import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { getEnv } from './utils/getEnv';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	const PORT = getEnv('PORT') ?? 3030;
	await app.listen(PORT, '0.0.0.0', () => {
		console.log(`Server is running on http://0.0.0.0:${PORT}`);
	});
}
bootstrap();

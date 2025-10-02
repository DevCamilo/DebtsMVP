import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const config = new DocumentBuilder()
		.setTitle('Debts API')
		.setVersion('0.0.1')
		.addBearerAuth()
		.build();
	const doc = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, doc);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
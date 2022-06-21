import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '~modules/app/app.module';
import { configureMiddleware } from '~modules/common/middleware';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  await configureMiddleware(app);

  /* Start the web server on a specific port defined in .env */
  await app.listen(process.env.APPLICATION_PORT);

  logger.log(
    `Application started, listening on port ${process.env.APPLICATION_PORT}`,
  );
}

(async () => await bootstrap())();

import { INestApplication } from '@nestjs/common';
import { configureV1Swagger } from '~modules/common/middleware/swagger';
import { HttpExceptionFilter } from '~modules/common/filters/http-exception.filter';
import { TransformInterceptor } from '~modules/common/interceptors/transform.interceptor';

export const configureMiddleware = async (app: INestApplication) => {
  /* Error handling */
  app.useGlobalFilters(new HttpExceptionFilter());

  /* Response interceptor */
  app.useGlobalInterceptors(new TransformInterceptor());

  /* Enable endpoint versioning  */
  await app.enableVersioning();

  /* Enable swagger documentation */
  await configureV1Swagger(app);
};

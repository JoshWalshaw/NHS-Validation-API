import { INestApplication } from '@nestjs/common';
import { configureV1Swagger } from '~modules/common/middleware/swagger';

export const configureMiddleware = async (app: INestApplication) => {
  /* Enable endpoint versioning  */
  await app.enableVersioning();

  //<editor-fold desc="Swagger Setup">
  await configureV1Swagger(app);
  //</editor-fold>
};

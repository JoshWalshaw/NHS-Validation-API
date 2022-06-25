import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Icd10Module } from '~modules/icd10/icd10.module';
import { NhsNumberModule } from '~modules/nhs-number/nhs-number.module';

/**
 * Configures Swagger documentation to be generated for the V1 API endpoints.
 *
 * @param app - An instance of INestApplication, this comes from NestFactory.create() in our root main.ts file.
 */
export const configureV1Swagger = async (
  app: INestApplication,
): Promise<void> => {
  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('NHS Validation API')
        .setDescription('Something something... Josh to place text here')
        .setVersion('0.1')
        .build(),
      {
        include: [NhsNumberModule, Icd10Module],
      },
    ),
  );
};

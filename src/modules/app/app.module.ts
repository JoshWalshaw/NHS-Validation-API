import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Icd10Module } from '~modules/icd10/icd10.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icd10 } from '~modules/icd10/icd10.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [Icd10],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
    }),
    Icd10Module,
  ],
})
export class AppModule {}

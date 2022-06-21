import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Icd10Module } from '~modules/icd10/icd10.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), Icd10Module],
})
export class AppModule {}

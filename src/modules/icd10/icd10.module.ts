import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icd10Controller } from '~modules/icd10/icd10.controller';
import { Icd10Service } from '~modules/icd10/icd10.service';
import { Icd10TasksModule } from '~modules/icd10/tasks/tasks.module';
import { Icd10 } from '~modules/icd10/icd10.entity';

@Module({
  imports: [Icd10TasksModule, TypeOrmModule.forFeature([Icd10])],
  controllers: [Icd10Controller],
  providers: [Icd10Service],
})
export class Icd10Module {}

import { Module } from '@nestjs/common';
import { Icd10Controller } from '~modules/icd10/icd10.controller';
import { Icd10Service } from '~modules/icd10/icd10.service';
import { Icd10TasksModule } from '~modules/icd10/tasks/tasks.module';

@Module({
  imports: [Icd10TasksModule],
  controllers: [Icd10Controller],
  providers: [Icd10Service],
})
export class Icd10Module {}

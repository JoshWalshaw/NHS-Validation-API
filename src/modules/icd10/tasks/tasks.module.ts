import { Module } from '@nestjs/common';
import { Icd10TasksService } from '~modules/icd10/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icd10 } from '~modules/icd10/icd10.entity';
import { Icd10Service } from '~modules/icd10/icd10.service';

@Module({
  imports: [TypeOrmModule.forFeature([Icd10])],
  providers: [Icd10TasksService, Icd10Service],
})
export class Icd10TasksModule {}

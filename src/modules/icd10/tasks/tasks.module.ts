import { Module } from '@nestjs/common';
import { Icd10TasksService } from '~modules/icd10/tasks/tasks.service';

@Module({
  providers: [Icd10TasksService],
})
export class Icd10TasksModule {}

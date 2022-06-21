import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Icd10 } from '~modules/icd10/icd10.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class Icd10Service {
  private readonly logger = new Logger(Icd10Service.name);

  constructor(
    @InjectRepository(Icd10)
    private icd10Repository: Repository<Icd10>,
    private dataSource: DataSource,
  ) {}

  async find(code: string): Promise<Icd10> {
    const model = await this.icd10Repository.findOne({
      where: [{ code }, { altCode: code }],
    });

    if (model) return model;

    throw new NotFoundException('Could not find a ICD10 record with that code');
  }

  async getCount(): Promise<number> {
    return this.icd10Repository.count();
  }

  async createMany(models: Array<Icd10>) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const model of models) {
        await queryRunner.manager.save(model);
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      this.logger.error('There was an error saving models to transaction');
      this.logger.error(e);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async deleteAll(): Promise<void> {
    await this.icd10Repository.clear();
  }
}

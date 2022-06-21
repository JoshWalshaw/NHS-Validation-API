import { promises as fs } from 'fs';
import * as path from 'path';
import * as xml2json from 'xml2json';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { Icd10ImportXml } from '../../../interfaces/icd10-import-xml';
import { Icd10 } from '~modules/icd10/icd10.entity';
import { Icd10Service } from '~modules/icd10/icd10.service';

@Injectable()
export class Icd10TasksService {
  constructor(private readonly icd10Service: Icd10Service) {}

  private readonly logger = new Logger(Icd10TasksService.name);

  private readonly Icd10Path = path.join(process.cwd(), '/imports/icd10');

  private async processImport(): Promise<void> {
    this.logger.log('ICD10 import is starting.');

    try {
      /* Check our 'imports' folder for any xml files, we should only have 1 at a time */
      const filesInDirectory = await fs.readdir(this.Icd10Path);
      const targetFilePath = filesInDirectory.find(
        (file) => path.extname(file) === '.xml',
      );

      /* Ensure that we have a singular .xml file before proceeding */
      if (filesInDirectory.length !== 2 || !targetFilePath?.length) {
        this.logger.log('No files were found to process.');
        return;
      }

      const fileBuffer = await fs.readFile(
        path.join(this.Icd10Path, targetFilePath),
      );

      /* Load our XML into a JSON object we can easily work with */
      const xml: Icd10ImportXml = xml2json.toJson(
        fileBuffer.toString('utf-8'),
        {
          object: true,
        },
      );

      /* Create an array of models from our objects */
      const models = xml.DSV.CLASS.map((item) => {
        const model = new Icd10();
        model.code = item.CODE;
        model.altCode = item.ALT_CODE;
        model.usage = item.USAGE;
        model.usageUk = item.USAGE_UK;
        model.description = item.DESCRIPTION;
        model.qualifiers = item.QUALIFIERS;
        model.genderMask = item.GENDER_MASK;
        model.minAge = item.MIN_AGE;
        model.maxAge = item.MAX_AGE;
        model.treeDescription = item.TREE_DESCRIPTION;
        return model;
      });

      /* If we have models, wipe current database */
      if (models.length) {
        await this.icd10Service.deleteAll();
      }

      /* Start to save our models to database */
      await this.icd10Service.createMany(models);

      /* If we have records in database, delete the local file as it's no longer needed */
      if ((await this.icd10Service.getCount()) > 0) {
        await fs.rm(path.join(this.Icd10Path, targetFilePath));
      }
      this.logger.log('ICD10 import has finished.');
    } catch (e) {
      this.logger.error('There was an error importing ICD10 data.');
      this.logger.error(e);
    }
  }

  @Cron('0 0 * * *')
  async handleDailyImport() {
    await this.processImport();
  }

  @Timeout(1000)
  async handleImportOnStartup() {
    await this.processImport();
  }
}

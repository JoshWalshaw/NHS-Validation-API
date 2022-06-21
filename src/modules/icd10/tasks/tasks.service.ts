import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class Icd10TasksService {
  private readonly logger = new Logger(Icd10TasksService.name);

  private processImport(): void {
    this.logger.debug('Import starting');
  }

  @Cron('0 0 * * *')
  handleDailyImport() {
    this.processImport();
  }

  @Timeout(5000)
  handleTimeout() {
    this.processImport();
  }
}

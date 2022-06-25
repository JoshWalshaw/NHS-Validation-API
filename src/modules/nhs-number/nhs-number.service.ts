import { Injectable, Logger } from '@nestjs/common';
import { NHSNumber } from 'nhs-validation';

@Injectable()
export class NhsNumberService {
  private readonly logger = new Logger(NhsNumberService.name);

  validate(input: string): boolean {
    return NHSNumber.validate(input);
  }

  generate(): string {
    return NHSNumber.generate();
  }
}

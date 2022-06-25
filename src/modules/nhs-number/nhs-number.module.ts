import { Module } from '@nestjs/common';
import { NhsNumberController } from '~modules/nhs-number/nhs-number.controller';
import { NhsNumberService } from '~modules/nhs-number/nhs-number.service';

@Module({
  controllers: [NhsNumberController],
  providers: [NhsNumberService],
})
export class NhsNumberModule {}

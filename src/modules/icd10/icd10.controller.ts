import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Icd10Service } from '~modules/icd10/icd10.service';

@ApiTags('UK International Classification of Diseases 10th Edition (ICD10)')
@Controller({
  path: 'icd10',
})
export class Icd10Controller {
  constructor(private readonly icd10Service: Icd10Service) {}

  @Get('/')
  @ApiOperation({
    summary: 'testing',
  })
  async testing() {
    return await this.icd10Service.testing();
  }
}

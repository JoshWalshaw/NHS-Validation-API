import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Icd10Service } from '~modules/icd10/icd10.service';

@ApiTags('UK International Classification of Diseases 10th Edition (ICD10)')
@Controller({
  path: 'icd10',
})
export class Icd10Controller {
  constructor(private readonly icd10Service: Icd10Service) {}

  @Get(':code/validate')
  @ApiOperation({
    summary: 'Check to see if an ICD10 code is valid.',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'ICD10 code you want to validate',
  })
  async validateCode(@Param('code') code: string) {
    const model = await this.icd10Service.find(code);
    return model.code.length > 0;
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Get an ICD10 record.',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'ICD10 code you want to get the description for',
  })
  async getCodeDescription(@Param('code') code: string) {
    return await this.icd10Service.find(code);
  }
}

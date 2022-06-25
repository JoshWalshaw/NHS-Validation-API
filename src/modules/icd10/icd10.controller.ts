import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Icd10Service } from '~modules/icd10/icd10.service';
import { PaginationDto } from '~modules/common/dto/pagination.dto';

@ApiTags('UK International Classification of Diseases 10th Edition (ICD10)')
@Controller({
  path: 'icd10',
})
export class Icd10Controller {
  constructor(private readonly icd10Service: Icd10Service) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get all ICD10 records.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAll(@Query() query: PaginationDto): Promise<unknown> {
    return await this.icd10Service.getAll(query);
  }

  @Get(':code/validate')
  @ApiOperation({
    summary: 'Check to see if an ICD10 code is valid.',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'ICD10 code you want to validate',
  })
  async validateCode(@Param('code') code: string): Promise<unknown> {
    const model = await this.icd10Service.find(code);
    return model.code.length > 0;
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Get a single ICD10 record.',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'ICD10 code you want to get the description for',
  })
  async getCodeDescription(@Param('code') code: string): Promise<unknown> {
    return await this.icd10Service.find(code);
  }
}

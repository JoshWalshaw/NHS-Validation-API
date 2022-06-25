import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NhsNumberService } from '~modules/nhs-number/nhs-number.service';

@ApiTags('NHS Number')
@Controller({
  path: 'nhs-number',
})
export class NhsNumberController {
  constructor(private readonly nhsNumberService: NhsNumberService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Generates a random NHS number',
  })
  async generateNhsNumber() {
    return this.nhsNumberService.generate();
  }

  @Get(':number/validate')
  @ApiOperation({
    summary:
      'Check to see if a number provided has the potential to be a valid NHS Number',
  })
  @ApiParam({
    name: 'number',
    type: 'string',
    description: 'Number you would like to validate',
  })
  async validateNhsNumber(@Param('number') number: string) {
    return this.nhsNumberService.validate(number);
  }
}

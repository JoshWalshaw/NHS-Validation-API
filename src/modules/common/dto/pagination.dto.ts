import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export abstract class AbstractPaginationDto {
  @ApiProperty({
    required: false,
    default: 1,
    example: 1,
    description: 'The page you want to view',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    required: false,
    default: 25,
    example: 25,
    description:
      'How many records per page you would like to view. Use 0 to return all records.',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  limit?: number = 25;
}

export class PaginationDto extends AbstractPaginationDto {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEstoquegeralDto } from './create-estoquegeral.dto';

export class UpdateEstoquegeralDto extends PartialType(CreateEstoquegeralDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCouchdbDto } from './create-couchdb.dto';

export class UpdateCouchdbDto extends PartialType(CreateCouchdbDto) {}

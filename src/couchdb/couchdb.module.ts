import { Module } from '@nestjs/common';
import { CouchdbService } from './couchdb.service';
import { CouchdbController } from './couchdb.controller';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [CouchdbController],
  providers: [CouchdbService],
  exports: [CouchdbService],
})
export class CouchdbModule {}

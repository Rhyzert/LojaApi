import { Module } from '@nestjs/common';
import { EstoquegeralService } from './estoquegeral.service';
import { EstoquegeralController } from './estoquegeral.controller';
import { ItemModule } from 'src/item/item.module';
import { CouchdbService } from 'src/couchdb/couchdb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item,ItemSchema } from 'src/schema/item.schema';

@Module({
  imports: [
    ItemModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
  controllers: [EstoquegeralController],
  providers: [EstoquegeralService, CouchdbService],
})
export class EstoquegeralModule {}

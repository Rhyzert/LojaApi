import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouchdbModule } from './couchdb/couchdb.module';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EstoquegeralModule } from './estoquegeral/estoquegeral.module';

@Module({
  imports: [CouchdbModule,  MongooseModule.forRoot('mongodb://localhost:27017/api_loja'), ItemModule, EstoquegeralModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

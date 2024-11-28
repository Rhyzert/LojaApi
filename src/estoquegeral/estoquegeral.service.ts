import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { CreateEstoquegeralDto } from './dto/create-estoquegeral.dto';
import { UpdateEstoquegeralDto } from './dto/update-estoquegeral.dto';
import { ItemService } from 'src/item/item.service';
import { CouchdbService } from 'src/couchdb/couchdb.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from 'src/schema/item.schema';

@Injectable()
export class EstoquegeralService {
  private nano: Nano.ServerScope;
  private db: Nano.DocumentScope<any>;

  constructor(private readonly itemService: ItemService, @InjectModel(Item.name) private readonly itemModel: Model<Item>) { // Injeção de dependência
    this.nano = Nano('http://admin:senha@localhost:5984');
    this.db = this.nano.use('api_loja');
  }

  async updateGeral(id_estoque: string, updateData: Partial<Item>, doc: any) {
    this.itemModel
      .findOneAndUpdate({ id_estoque }, updateData, { new: true }) 
      .exec();
    
    this.updateCouch(id_estoque, doc)
  }

  async updateCouch(idEstoque: string, doc: any) {
    try {
      console.log('Iniciando atualização para id_estoque:', idEstoque);

      // Consulta o CouchDB
      const queryResult = await this.db.find({
        selector: { id_estoque: idEstoque },
        limit: 1,
      });

      console.log('Resultado da consulta:', JSON.stringify(queryResult, null, 2));

      if (!queryResult.docs || queryResult.docs.length === 0) {
        throw new Error(`Documento com id_estoque '${idEstoque}' não encontrado.`);
      }

      const existingDoc = queryResult.docs[0];

      const updatedDoc = {
        ...existingDoc,
        ...doc,
        _id: existingDoc._id,
        _rev: existingDoc._rev,
      };

      const couchResponse = await this.db.insert(updatedDoc);

      console.log('Documento atualizado no CouchDB:', couchResponse);

      return { couchResponse };
    } catch (error) {
      console.error(`Erro ao atualizar documento com id_estoque '${idEstoque}':`, error.message);
      throw error;
    }
  }
}

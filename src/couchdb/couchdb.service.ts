import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class CouchdbService {
  private nano: Nano.ServerScope;
  private db: Nano.DocumentScope<any>;

  constructor(private readonly itemService: ItemService) { // Injeção de dependência
    this.nano = Nano('http://admin:senha@localhost:5984');
    this.db = this.nano.use('api_loja');
  }

  async createDocument(doc: any) {
    try {
      return await this.db.insert(doc);
    } catch (error: any) {
      console.error('Erro ao criar documento:', error.message);
      throw new Error('Não foi possível criar o documento.');
    }
  }

  async getDocument(id: string) {
    try {
      return await this.db.get(id);
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.warn(`Documento com ID '${id}' não encontrado.`);
        return null;
      }
      console.error('Erro ao buscar documento:', error.message);
      throw new Error('Não foi possível buscar o documento.');
    }
  }

  async updateDocument(id: string, doc: any) {
    try {
      const existingDoc = await this.getDocument(id);
      if (!existingDoc) {
        throw new Error(`Documento com ID '${id}' não encontrado.`);
      }

      const updatedDoc = {
        ...existingDoc,
        ...doc,
        _id: id,
        _rev: existingDoc._rev,
      };

      return await this.db.insert(updatedDoc);
    } catch (error: any) {
      console.error('Erro ao atualizar documento:', error.message);
      throw new Error('Não foi possível atualizar o documento.');
    }
  }

  async updateDocumentByEstoqueId(idEstoque: string, doc: any) {
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

      // Atualização no MongoDB usando o ItemService
      const mongoResponse = await this.itemService.updateByEstoque(idEstoque, doc);

      console.log('Documento atualizado no MongoDB:', mongoResponse);

      return { couchResponse, mongoResponse };
    } catch (error) {
      console.error(`Erro ao atualizar documento com id_estoque '${idEstoque}':`, error.message);
      throw error;
    }
  }

  async deleteDocument(id: string) {
    try {
      const existingDoc = await this.getDocument(id);
      if (!existingDoc) {
        throw new Error(`Documento com ID '${id}' não encontrado.`);
      }

      return await this.db.destroy(id, existingDoc._rev);
    } catch (error: any) {
      console.error('Erro ao deletar documento:', error.message);
      throw new Error('Não foi possível deletar o documento.');
    }
  }
}

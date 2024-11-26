import { Injectable } from '@nestjs/common';
import * as Nano from 'nano';

@Injectable()
export class CouchdbService {
  private nano: Nano.ServerScope;
  private db: Nano.DocumentScope<any>;

  constructor() {
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
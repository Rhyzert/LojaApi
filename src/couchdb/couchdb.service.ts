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
    return await this.db.insert(doc);
  }

  async getDocument(id: string) {
    return await this.db.get(id);
  }

  async updateDocument(id: string, doc: any) {
    const existingDoc = await this.getDocument(id);
    return await this.db.insert({ ...existingDoc, ...doc });
  }

  async deleteDocument(id: string) {
    const existingDoc = await this.getDocument(id);
    return await this.db.destroy(id, existingDoc._rev);
  }
}
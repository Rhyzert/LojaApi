import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
//import { VendaprodutosService } from '../vendaprodutos/vendaprodutos.service';
//import { CreateVendaprodutoDto } from '../vendaprodutos/dto/create-vendaproduto.dto';
//import { UpdateVendaprodutoDto } from '../vendaprodutos/dto/update-vendaproduto.dto';
import { CouchdbService } from './couchdb.service';
@Controller('couchcontroller')
export class CouchdbController {
  constructor(/*private readonly vendaProdutoService: VendaprodutosService,*/
              private readonly couchService : CouchdbService
  ) {}

  @Post()
  async create(@Body() document: any) {
    return this.couchService.createDocument(document);
  }

  // @Get()
  // async findAll() {
  //   return this.CouchdbService.findAll();
  // }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.couchService.getDocument(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() document: any) {
    return this.couchService.updateDocument(id, document);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.couchService.getDocument(id);
  }
}

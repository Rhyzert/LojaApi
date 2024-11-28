import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { EstoquegeralService } from './estoquegeral.service';
import { CreateEstoquegeralDto } from './dto/create-estoquegeral.dto';
import { UpdateEstoquegeralDto } from './dto/update-estoquegeral.dto';
import { Item } from 'src/schema/item.schema';

@Controller('estoquegeral')
export class EstoquegeralController {
  constructor(private readonly estoquegeralService: EstoquegeralService) {}

  @Put('estoquegeral/:id_estoque')
  async updateByEstoqueId(@Param('id_estoque') idEstoque: string, @Body() document: any, @Body() updateData: Partial<Item>) {
    try {
      return await this.estoquegeralService.updateGeral(idEstoque, updateData, document);
    } catch (error) {
      console.error('Erro ao atualizar documento por id_estoque:', error.message);
      if (error.message.includes('não encontrado')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao atualizar documento no CouchDB.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

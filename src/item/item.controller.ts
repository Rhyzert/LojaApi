import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from 'src/schema/item.schema';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() item: Partial<Item>): Promise<Item> {
    return this.itemService.create(item);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get('estoque/:id_estoque')
  async findEstoque(@Param('id_estoque') id_estoque: string): Promise<Item[]> {
    return this.itemService.findByEstoque(id_estoque);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() item: Partial<Item>): Promise<Item> {
    return this.itemService.update(id, item);
  }

  @Put('estoque/:id_estoque')
async updateByEstoque(
  @Param('id_estoque') id_estoque: string,
  @Body() updateData: Partial<Item>,
): Promise<Item> {
  return this.itemService.updateByEstoque(id_estoque, updateData);
}


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Item> {
    return this.itemService.delete(id);
  }
}

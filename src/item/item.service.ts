import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from 'src/schema/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) {}

  async create(item: Partial<Item>): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async findByEstoque(id_estoque: string): Promise<Item[]> {
    return this.itemModel.find({ id_estoque }).exec();
  }

  async updateByEstoque(id_estoque: string, updateData: Partial<Item>): Promise<Item> {
    return this.itemModel
      .findOneAndUpdate({ id_estoque }, updateData, { new: true }) 
      .exec();
  }

  async updateByEstoqueLista(id_estoque: string, updateData: Partial<Item>): Promise<any> {
    return this.itemModel
      .updateMany({ id_estoque }, { $set: updateData }) 
      .exec();
  }
  

  async update(id: string, item: Partial<Item>): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id).exec();
  }
}

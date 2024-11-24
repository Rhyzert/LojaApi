import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ required: true }) 
  id_estoque: string;

  @Prop({ required: true }) 
  id_produto: string;

  @Prop({ required: true }) 
  quantidade: number;

  @Prop({ required: true }) 
  loja: string;

  @Prop({ required: true }) 
  categoria: string;

  @Prop({  default: Date.now }) 
  ultima_atualizacao: string;

}

export const ItemSchema = SchemaFactory.createForClass(Item);
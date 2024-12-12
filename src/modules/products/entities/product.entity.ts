import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  modelNumber: string;

  @Prop({ required: true })
  warrantyPeriod: number; // Warranty in months

  @Prop()
  remark: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

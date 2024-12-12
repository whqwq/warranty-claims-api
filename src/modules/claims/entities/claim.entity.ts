import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Claim extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  userId: string;

  // claim details
  @Prop()
  description: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop()
  reply?: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);

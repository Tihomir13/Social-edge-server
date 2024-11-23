import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VerifyUserDocument = VerifyUser & Document;

@Schema({
  timestamps: true,
})
export class VerifyUser {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  token: string;
}

export const VerifyUserSchema = SchemaFactory.createForClass(VerifyUser);

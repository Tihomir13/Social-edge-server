import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserInfoDocument = UserInfo & Document;

@Schema({})
export class Birthday {
  @Prop({ required: true })
  day: number;

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number;
}

@Schema({ minimize: false })
export class UserInfo {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: false, default: null })
  currLocation: string | null;

  @Prop({ required: false, default: [] })
  studied: string[];

  @Prop({ required: false, default: [] })
  worksIn: string[];

  @Prop({ required: false, default: null })
  relationship: number | null;

  @Prop({ required: false, default: null })
  phoneNumber: string | null;

  @Prop({ type: Birthday, required: true })
  birthday: Birthday;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

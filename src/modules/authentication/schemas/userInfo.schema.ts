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

@Schema()
export class UserInfo {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: false })
  currLocation: string;

  @Prop({ required: false })
  studied: string[];

  @Prop({ required: false })
  worksIn: string[];

  @Prop({ required: false })
  relationship: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ type: Birthday, required: true })
  birthday: Birthday;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

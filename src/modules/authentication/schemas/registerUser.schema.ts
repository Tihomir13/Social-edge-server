import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({})
export class Name {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

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
export class Image {
  @Prop({})
  data: string;

  @Prop({})
  contentType: string;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ type: Name, required: true })
  name: Name;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Birthday, required: true })
  birthday: Birthday;

  @Prop({ required: true })
  friendsIds: string[];

  @Prop({ type: Image, required: true })
  profileImage: Image;

  @Prop({ type: Image, required: true })
  bannerImage: Image;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

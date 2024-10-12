import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Post & Document;

@Schema({ timestamps: true })
export class Reply {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  likes: string;

  @Prop({ required: true })
  replies: Reply[];
}

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  likes: string;

  @Prop({ required: true })
  replies: Reply[];
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  images: Buffer[];

  @Prop({ required: true })
  likes: number;

  @Prop({ required: true })
  comments: Comment[];

  //   @Prop({ type: Name, required: true })
  //   name: Name;

  //   @Prop({ required: true, unique: true })
  //   email: string;

  //   @Prop({ type: Birthday, required: true })
  //   birthday: Birthday;

  //   @Prop({ required: true })
  //   password: string;

  //   @Prop({ required: true })
  //   salt: string;
}

export const UserSchema = SchemaFactory.createForClass(Post);

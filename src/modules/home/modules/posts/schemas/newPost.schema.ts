import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Reply {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reply' }] })
  replies: Reply[];
}

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reply' }] })
  replies: Reply[];
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String], required: true }) // Съхранява изображения като URL-и (string)
  images: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] }) // Отнася се към колекцията за коментари
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ _id: false })
export class Author {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  username: string;
}

@Schema({ timestamps: true })
export class Reply {
  @Prop({ required: true })
  author: Author;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reply' }] })
  replies: Reply[];
}

@Schema({ timestamps: true, _id: false })
export class Comment {
  @Prop({ required: true })
  author: Author;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reply' }] })
  replies: Reply[];
}

@Schema()
export class Image {
  @Prop({ required: true })
  data: string;

  @Prop({ required: true })
  contentType: string;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  author: Author;

  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  text: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ type: [Image], required: true })
  images: Image[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

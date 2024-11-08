import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/newPost.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createNewPost(userData: any, res): Promise<any> {
    try {
      console.log(userData);

      const images = userData.images.map((file) => file.buffer);

      const newPost = new this.postModel({
        author: userData.userId,
        title: userData.title,
        text: userData.text,
        images,
        likes: 0,
        comments: [],
      });

      await newPost.save();

      return res.status(201).json({
        message: 'New post is successfully created!',
        postId: newPost._id,
      });
    } catch (error) {
      console.error('New Post error', error);
      return res.status(400).json({ message: 'New Post Failed' });
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Post, PostDocument } from './schemas/newPost.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createNewPost(userData: any, res): Promise<any> {
    try {
      const images = userData.images.map((file) => ({
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
      }));

      const newPost = new this.postModel({
        author: { username: userData.username, id: userData.userId },
        title: userData.title,
        text: userData.text,
        tags: userData.tags,
        images,
        likes: [],
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

  async getPosts(req: any, res: any): Promise<any> {
    const userId: string = req.user.id;
    const username: string = req.user.username;

    try {
      const posts = await this.postModel
        .find({
          'author.id': userId,
        })
        .sort({ createdAt: -1 });

      console.log(posts);

      const formattedPosts = posts.map((post) => {
        const postObject = post.toObject();

        // Добавяме проверка дали съществуват images
        const images = postObject.images || [];

        return {
          ...postObject,
          images: images
            .map((image) => {
              // Проверка дали image съществува и има нужните properties
              if (!image || !image.data || !image.contentType) {
                return null;
              }

              return {
                src: `data:${image.contentType};base64,${image.data}`,
                contentType: image.contentType,
              };
            })
            .filter((img) => img !== null),
        };
      });

      console.log('Formatted posts:', formattedPosts);

      return res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: formattedPosts,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(400).json({ message: 'Failed to fetch posts' });
    }
  }

  async likePost(
    req: any,
    res: any,
    userData: any,
    postId: string,
  ): Promise<any> {
    try {
      // Намираме поста по ID
      const post = await this.postModel.findOne({
        _id: new Types.ObjectId(postId),
      });

      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      let likes = [...post.likes];

      if (likes.includes(userData.id)) {
        const index = likes.indexOf(userData.id);
        likes.splice(index, 1);
      } else {
        likes.push(userData.id);
      }

      await this.postModel.updateOne(
        { _id: new Types.ObjectId(postId) },
        { $set: { likes: likes } },
      );

      return res.status(200).json({
        likes,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: 'Post like failed',
      });
    }
  }
}

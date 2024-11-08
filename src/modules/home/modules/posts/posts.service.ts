import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  createNewPost(newPost, res) {
    console.log(newPost);

    // try {
    //   return res.status(201).json({
    //     message: `New post: ${newPost} is successfully created!`,
    //   });
    // } catch (error) {
    //   console.error('New Post error', error);
    //   return res.status(400).json({ message: 'New Post Failed' });
    // }
  }
}

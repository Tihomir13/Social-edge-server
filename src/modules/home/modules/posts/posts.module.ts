import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { NewPostsController } from './controllers/new-posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/newPost.schema';
import { PostsController } from './controllers/posts.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema, collection: 'posts' },
    ]),
  ],
  controllers: [NewPostsController, PostsController],
  providers: [PostsService],
  exports: [
    PostsService,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostsModule {}

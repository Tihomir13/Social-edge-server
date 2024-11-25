import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileService } from './profile.service';
import { PostsService } from '../posts/posts.service';
import { ProfileController } from './controllers/profile.controller';
import { PostSchema } from '../posts/schemas/newPost.schema';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '../posts/posts.module';
import { User, UserSchema } from '../../../authentication/schemas/registerUser.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema, collection: 'posts' },
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
    PostsModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService, PostsService],
  exports: [],
})
export class ProfileModule {}

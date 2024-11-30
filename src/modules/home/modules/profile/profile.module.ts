import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ProfileService } from './profile.service';
import { PostsService } from '../posts/posts.service';
import { ProfileController } from './controllers/profile.controller';
import { PostSchema } from '../posts/schemas/newPost.schema';
import { PostsModule } from '../posts/posts.module';
import { User, UserSchema } from '../../../authentication/schemas/registerUser.schema';
import { UserInfo, UserInfoSchema } from '../../../authentication/schemas/userInfo.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema, collection: 'posts' },
      { name: User.name, schema: UserSchema, collection: 'users' },
      { name: UserInfo.name, schema: UserInfoSchema, collection: 'userInformation' },
    ]),
    PostsModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService, PostsService],
  exports: [],
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { ProfileModule } from './modules/profile/profile.module';
import { PostsModule } from './modules/posts/posts.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule,
    PostsModule,
    ProfileModule,
    SearchModule,
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class HomeModule {}

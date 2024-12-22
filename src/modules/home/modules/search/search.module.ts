import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SearchService } from './search.service';
import { SearchController } from './controllers/search/search.controller';
import { User, UserSchema } from '../../../authentication/schemas/registerUser.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema, collection: 'users' },
  ]),],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}

import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { PostsService } from '../posts.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('new-posts')
export class NewPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 }, // Може да настроите броя на файловете тук
    ]),
  )
  async create(
    @Body() newPost: any,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    // Проверка дали има файлове в images и ги добавяме към новия пост
    newPost.images = files.images || [];

    return this.postsService.createNewPost(newPost, res);
  }
}

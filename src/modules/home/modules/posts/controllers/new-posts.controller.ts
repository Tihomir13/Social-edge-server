import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  Req,
} from '@nestjs/common';

import { PostsService } from '../posts.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('new-posts')
export class NewPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async create(
    @Body() userData: any,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Res() res: Response,
    @Req() req: any,
  ) {
    userData.images = files.images || [];

    console.log(userData);
    
    userData.userId = req.user?.id;
    userData.username = req.user?.username;

    return this.postsService.createNewPost(userData, res);
  }
}

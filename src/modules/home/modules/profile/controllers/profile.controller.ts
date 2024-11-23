import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ProfileService } from '../profile.service';
import { PostsService } from '../../posts/posts.service';

@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly postsService: PostsService,
    private readonly profileService: ProfileService,
  ) {}
  @Get(':username')
  async getUserPosts(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    return this.postsService.getPostsByUsername(username, res);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 1 }]))
  async uploadProfileIMage(
    @Body() userData: any,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Res() res: Response,
    @Req() req: any,
  ) {
    userData.images = files.images || [];

    userData.userId = req.user?.id;
    userData.username = req.user?.username;

    return this.profileService.uploadProfileImage();
  }
}

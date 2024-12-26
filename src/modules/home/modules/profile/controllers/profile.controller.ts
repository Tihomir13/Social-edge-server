import {
  Body,
  Controller,
  Delete,
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
  @Get(':username/posts')
  async getUserPosts(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    return this.postsService.getPostsByUsername(username, res);
  }

  @Get(':username/info')
  async getUserInfo(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const userId = req.user?.id;

    return this.profileService.getUserInfo(username, res, userId);
  }

  @Get(':username')
  async getUserInitialData(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const userId = req.user?.id;

    return this.profileService.getInitialUserData(username, res, userId);
  }

  @Post(':username/info')
  async addUserInfo(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
    @Body() body: any,
  ) {
    const userId = req.user?.id;

    return this.profileService.addUserInfo(username, body, res, userId);
  }

  @Post(':username/new-profile-photo')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 1 }]))
  async addNewProfilePhoto(
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const newProfilePhotoFile = files['images']?.[0];
    const userId = req.user?.id;
    
    return this.profileService.addNewPhoto(username, newProfilePhotoFile, res, userId);
  }

  @Delete(':username/new-profile-photo-remove')
  async removePhoto(
    @Param('username') username: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const userId = req.user?.id;
    
    return this.profileService.removePhoto(username, res, userId);
  }
  
}

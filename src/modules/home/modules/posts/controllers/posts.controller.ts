import { Body, Controller, Get, Patch, Req, Res } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Controller('posts')
export class GetPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Req() req: any, @Res() res: Response) {
    return this.postsService.getPosts(req, res);
  }

  @Patch('like')
  async likePost(@Req() req: any, @Res() res: Response, @Body() postId: any) {
    const userData = req.user;

    return this.postsService.likePost(req, res, userData, postId);
  }
}

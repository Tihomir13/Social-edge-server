import { Controller, Get, Req, Res } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Controller('posts')
export class GetPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Req() req: any, @Res() res: Response) {
    return this.postsService.getPosts(req, res);
  }
}

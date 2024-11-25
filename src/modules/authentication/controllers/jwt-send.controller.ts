import { Controller, Get, Query, Req, Res } from '@nestjs/common';

import { AuthenticationService } from '../authentication.service';

@Controller('jwt-send')
export class JwtSendController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get()
  async verifyToken(@Req() req: any, @Res() res: Response) {
    const userData = req.user;

    return await this.authService.sendJwt(userData, res);
  }
}

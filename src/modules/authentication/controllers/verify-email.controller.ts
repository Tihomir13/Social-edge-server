import { Body, Controller, Get, Query, Res } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Controller('verify-token')
export class VerifyEmailController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get()
  async verifyToken(@Query('token') token: string, @Res() res: Response) {
    return await this.authService.verifyEmail(token, res);
  }
}

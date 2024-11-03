import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../authentication.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  async login(@Body() userData: any, @Res() res: Response) {
    return this.authService.login(userData, res);
  }
}

import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../authentication.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  async register(@Body() userData: any, @Res() res: Response) {
    return this.authService.register(userData, res);
  }
}

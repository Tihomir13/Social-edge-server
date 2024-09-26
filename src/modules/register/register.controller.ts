import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() userData: any, @Res() res: Response) {
    return this.registerService.register(userData, res);
  }
}

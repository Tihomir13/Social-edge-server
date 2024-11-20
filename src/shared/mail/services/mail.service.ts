import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { randomBytes } from 'crypto';
import { api } from '../../constants/api';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  generateEmailToken(): string {
    return randomBytes(32).toString('hex');
  }

  async sendEmailVerification(
    user: {
      email: string;
      name: string;
      token: string;
    },
    subject: string,
  ) {
    const url = `${api}/auth/verify?token=${user.token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: subject,
      template: 'email-verification.hbs',
      context: {
        name: user.name,
        url,
      },
    });
  }
}

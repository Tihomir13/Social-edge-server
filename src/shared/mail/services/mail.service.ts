import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { randomBytes } from 'crypto';
import { api, apiServer } from '../../constants/api';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  generateEmailToken(): string {
    return randomBytes(111).toString('hex');
  }

  async sendEmailVerification(
    user: {
      email: string;
      name: { firstName: string; lastName: string };
      token: string;
    },
    subject: string,
  ) {
    const url = `${apiServer}/verify-token?token=${user.token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: subject,
      template: 'email-verification.hbs',
      context: {
        name: `${user.name.firstName} ${user.name.lastName}`,
        url,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { RegisterController } from './controllers/register.controller';
import { LoginController } from './controllers/login.controller';
import { AuthenticationService } from './authentication.service';
import { User, UserSchema } from './schemas/registerUser.schema';
import { VerifyUser, VerifyUserSchema } from './schemas/verifyUser.schema';
import { AgeService } from './helpers/age.service';
import { join } from 'path';
import { MailService } from '../../shared/mail/services/mail.service';
import { VerifyEmailController } from './controllers/verify-email.controller';
import { JwtSendController } from './controllers/jwt-send.controller';
import { UserInfo, UserInfoSchema } from './schemas/userInfo.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
      {
        name: VerifyUser.name,
        schema: VerifyUserSchema,
        collection: 'userTokens',
      },
      {
        name: UserInfo.name,
        schema: UserInfoSchema,
        collection: 'userInformation',
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MailerOptions> => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'social.edge2025@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"Social Edge" social.edge2025@gmail.com',
        },
        template: {
          dir: join(__dirname, '../../shared/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [AuthenticationService, AgeService, MailService],
  controllers: [RegisterController, LoginController, VerifyEmailController, JwtSendController],
})
export class AuthenticationModule {
  constructor() {}
}

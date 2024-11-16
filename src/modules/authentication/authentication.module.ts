import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RegisterController } from './controllers/register.controller';
import { LoginController } from './controllers/login.controller';
import { AuthenticationService } from './authentication.service';
import { User, UserSchema } from './schemas/registerUser.schema';
import { AgeService } from './helpers/age.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthenticationService, AgeService],
  controllers: [RegisterController, LoginController],
})
export class AuthenticationModule {}

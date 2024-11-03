import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register.controller';
import { AuthenticationService } from './authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/registerUser.schema';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}

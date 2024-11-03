import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UtilityModule } from './shared/modules/utility/utility.module';
import { JwtMiddleware } from './middlewares/jwt/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule,
    AuthenticationModule,
    UtilityModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'register', method: RequestMethod.ALL },
        { path: 'login', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

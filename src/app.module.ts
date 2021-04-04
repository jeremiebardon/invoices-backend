/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ItemsModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('SMTP_HOST'),
            port: configService.get<string>('SMTP_PORT'),
            auth: {
              user: configService.get<string>('SMTP_USER'),
              pass: configService.get<string>('SMTP_PASS'),
            },
          },
          defaults: {
            from: '"No Reply" <jeremie.dev.test@gmail.com>',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

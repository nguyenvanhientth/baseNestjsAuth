import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQLDB_HOST,
      port: parseInt(process.env.MYSQLDB_PORT,10)||3000,
      username: process.env.MYSQLDB_USERNAME,
      password: process.env.MYSQLDB_PASSWORD,
      database:  process.env.MYSQLDB_DATABASE,
      models: [ ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    AuthenticationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}

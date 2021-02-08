import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from '../users/users.module'

import { RefreshToken } from '../../models/refresh-token.model'

import { TokensService } from './tokens.service'
import { RefreshTokensRepository } from './refresh-tokens.repository'

import { AuthenticationController } from './authentication.controller'
import { JwtStrategy } from './jwt.strategy'
import configs from 'configs'

@Module({
  imports: [
    SequelizeModule.forFeature([
      RefreshToken,
    ]),
    JwtModule.register({
      secret: configs.SECRET_KEY,
      signOptions: {
        expiresIn: configs.expiresIn
      }
    }),
    UsersModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    TokensService,
    RefreshTokensRepository,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users/users.service'

import { User } from '../../models/user.model'
import configs from 'configs'

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private users: UsersService

  public constructor (users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// noi co the truy cap 
      ignoreExpiration: false,
      secretOrKey: configs.SECRET_KEY,
      signOptions: {
        expiresIn: configs.expiresIn,
      },
    })

    this.users = users
  }

  async validate (payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload

    const user = await this.users.findForId(id)

    if (!user) {
      return null
    }

    return user
  }
}
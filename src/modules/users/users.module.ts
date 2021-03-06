import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { User } from '../../models/user.model'

import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { ProfileRepository } from '../profile/profile.repository'

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
  ],
  providers: [
    UsersService,
    UsersRepository,
    ProfileRepository
  ],
  exports: [
    UsersService,
    UsersRepository,
  ],
})
export class UsersModule {}
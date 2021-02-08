import { UnprocessableEntityException, Injectable, BadRequestException } from '@nestjs/common'
import { compare } from 'bcrypt'

import { RegisterRequest } from '../../requests'

import { User } from '../../models/user.model'

import { UsersRepository } from '../users/users.repository'
import { ProfileRepository } from '../profile/profile.repository'

@Injectable()
export class UsersService {
  private readonly users: UsersRepository
  private readonly profile: ProfileRepository

  public constructor (users: UsersRepository, profile: ProfileRepository) {
    this.users = users;
    this.profile = profile
  }

  public async validateCredentials (user: User, password: string): Promise<boolean> {
    return compare(password, user.password)
  }

  public async createUserFromRequest (request: RegisterRequest): Promise<User> {
    const { username, password } = request

    const existingFromUsername = await this.findForUsername(request.username)

    if (existingFromUsername) {
      throw new UnprocessableEntityException('Username already in use')
    }
    // return this.users.create(username, password)
    return this.users.create(username, password)
      .then((res) => {return res})
      .catch((err) => {
        throw new BadRequestException("Error", err.message)
      });
  }

  public async findForId (id: number): Promise<User | null> {
    return this.users.findForId(id)
  }

  public async findForUsername (username: string): Promise<User | null> {
    return this.users.findForUsername(username)
  }

  public async findAll (userID): Promise<User[] | []> {
    return this.users.findAllUser(userID)
  }

  public async deleteUser (userID): Promise<void> {
    this.users.remove(userID)
    this.profile.remove(userID)
  }
}
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { hash } from 'bcrypt'
import { col, fn, Op, where } from 'sequelize'
import { User } from '../../models/user.model'

@Injectable()
export class UsersRepository {
  private readonly users: typeof User

  public constructor (@InjectModel(User) users: typeof User) {
    this.users = users
  }

  public async findAllUser (_id: number): Promise<User[] | []> {
    return this.users.findAll({
      attributes: ['id', 'username'],
      where: {
        id: {
          [Op.ne]: _id
        }
      }
    });
  }

  public async findForId (id: number): Promise<User | null> {
    return this.users.findOne({
      where: {
        id,
      },
    })
  }

  public async findForUsername (username: string): Promise<User | null> {
    return this.users.findOne({
      where: {
        username: where(fn('lower', col('username')), username),
      },
    })
  }

  public async create (username: string, password: string): Promise<User> {
    const user = new User()

    user.username = username
    user.password = await hash(password, 10)

    return user.save()
  }

  public async update(id: number, newPassword: string): Promise<User> {
    const user = await this.findForId(id);

    user.password = await hash(newPassword, 10)

    return user.save();
  }

  public async remove(id: number): Promise<void> {
    const user = await this.findForId(id);
    await user.destroy();
  }
  
}
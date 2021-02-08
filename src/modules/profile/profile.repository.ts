/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common'
import { Op } from 'sequelize'

import { Profile } from 'src/models/profile.model'



@Injectable()
export class ProfileRepository {
  private readonly profile: typeof Profile

  public async findAllUser (_id: number): Promise<Profile[] | []> {
    return this.profile.findAll({
      where: {
        id: {
          [Op.ne]: _id
        }
      }
    });
  }

  public async findProfileId(id: number): Promise<Profile | null> {
    return Profile.findOne({
      where: {
        user_id: {
          [Op.eq]: id
        },
      },
    })
  }

  public async create(
    user_id: number,
    firt_name: string,
    last_name: string,
    birthday: Date,
    address: string,
    mail: string,
    phone_number: string,
  ): Promise<Profile> {
    const profile = new Profile()
    profile.user_id = user_id
    profile.firt_name = firt_name
    profile.last_name = last_name
    profile.birthday = new Date(birthday) 
    profile.address = address
    profile.mail = mail
    profile.phone_number = phone_number

    return profile.save()
  }

  public async update(
    userID: number,
    firt_name: string,
    last_name: string,
    birthday: Date,
    address: string,
    mail: string,
    phone_number: string,): Promise<Profile> {
    const profile = await this.findProfileId(userID);
    // profile.user_id = user_id
    profile.firt_name = firt_name
    profile.last_name = last_name
    profile.birthday = new Date(birthday) 
    profile.address = address
    profile.mail = mail
    profile.phone_number = phone_number

    return profile.save()
  }

  public async remove(id: number): Promise<void> {
    const profile = await this.findProfileId(id);
    await profile.destroy();
  }
}
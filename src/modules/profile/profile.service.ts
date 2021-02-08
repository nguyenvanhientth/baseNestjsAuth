/* eslint-disable @typescript-eslint/camelcase */
import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Profile } from 'src/models/profile.model';

import { ProfileRepository } from './profile.repository';
import { CreateProfileRequest } from './profile.request';

@Injectable()
export class ProfileService {
  private readonly profileUser: ProfileRepository

  public constructor (profile: ProfileRepository) {
    this.profileUser = profile
  }

  public async createUserFromRequest(request: CreateProfileRequest, userID: number): Promise<Profile> {
    
    const { firt_name, last_name, birthday, address, mail, phone_number } = request;
    
    const existingFromProfile = await this.findForUserID(userID);

    if (existingFromProfile) {
      throw new UnprocessableEntityException('Profile already in use')
    }
    
    return this.profileUser.create(
      userID,
      firt_name,
      last_name,
      birthday,
      address,
      mail,
      phone_number)
      .then((res) => {return res})
      .catch((err) => {
        throw new BadRequestException("Error", err.message)
      });
  }

  public async findProfileId (id: number): Promise<Profile | null> {
    return this.profileUser.findProfileId(id)
  }

  public async findForUserID (userID: number): Promise<Profile | null> {
    return this.profileUser.findProfileId(userID)
  }

  public async updateUserFromRequest(request: CreateProfileRequest, userID: number): Promise<Profile> {
    
    const { firt_name, last_name, birthday, address, mail, phone_number } = request;
    
    const existingFromProfile = await this.findForUserID(userID);

    if (!existingFromProfile) {
      throw new UnprocessableEntityException('Profile not already in use')
    }
    
    return this.profileUser.update(
      userID,
      firt_name,
      last_name,
      birthday,
      address,
      mail,
      phone_number)
      .then((res) => {return res})
      .catch((err) => {
        throw new BadRequestException("Error", err.message)
      });
  }

  public async deleteProfile (userID: number): Promise<void> {
    this.profileUser.remove(userID)
  }
}

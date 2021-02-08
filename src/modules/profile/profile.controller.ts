/* eslint-disable @typescript-eslint/camelcase */
import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, Delete } from '@nestjs/common';

import { JWTGuard } from '../authentication/jwt.guard';
import { CreateProfileRequest } from './profile.request';
import { ProfileService } from './profile.service';

@Controller('/api/profile')
export class ProfileController {
  private readonly profile_user: ProfileService

  public constructor (profileUser: ProfileService) {
    this.profile_user = profileUser;
  }

  @Post('/create_profile')
  @HttpCode(200)
  @UseGuards(JWTGuard)
  public async createProfile(@Body() body: CreateProfileRequest,@Req() request) {
    const userId = request.user.id
    const data = await this.profile_user.createUserFromRequest(body,userId)
    return {
      status: 'success',
      data: data,
    }
  }

  @Get('/info_user')
  @UseGuards(JWTGuard)
  public async getUser (@Req() request) {
    const userId = request.user.id

    const data = await this.profile_user.findProfileId(userId)

    return {
      status: 'success',
      data: data,
    }
  }

  @Post('/update_user')
  @UseGuards(JWTGuard)
  public async updateUser (@Body() body: CreateProfileRequest,@Req() request) {
      const userId = request.user.id
      const data = await this.profile_user.updateUserFromRequest(body,userId)
      return {
        status: 'success',
        data: data,
      }
  }
  
  @Delete('/delete_user')
  @UseGuards(JWTGuard)
  public async deleteUser (@Req() request) {
      const userId = request.user.id
      await this.profile_user.deleteProfile(userId)
      return {
        status: 'success',
        data: {delete: "success"},
      }
  }
}

/* eslint-disable @typescript-eslint/camelcase */
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common'

import { LoginRequest, RefreshRequest, RegisterRequest } from '../../requests'

import { User } from '../../models/user.model'
import { JWTGuard } from './jwt.guard'

import { UsersService } from '../users/users.service'
import { TokensService } from './tokens.service'

export interface AuthenticationPayload {
  user: User
  payload: {
    type: string
    token: string
    refresh_token?: string
  }
}

@Controller('/api/auth')
export class AuthenticationController {
  private readonly users: UsersService
  private readonly tokens: TokensService

  public constructor (users: UsersService, tokens: TokensService) {
    this.users = users
    this.tokens = tokens
  }

  @Post('/register')
  public async register (@Body() body: RegisterRequest) {
    const user = await this.users.createUserFromRequest(body)

    const token = await this.tokens.generateAccessToken(user)
    const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)

    const payload = this.buildResponsePayload(user, token, refresh)

    return {
      status: 'success',
      data: payload,
    }
  }

  @Post('/login')
  @HttpCode(200)
  public async login (@Body() body: LoginRequest) {
    const { username, password } = body

    const user = await this.users.findForUsername(username)
    const valid = user ? await this.users.validateCredentials(user, password) : false;

    if (!user) {
      throw new BadRequestException('Account does not exist');
    } else {
      if (!valid) {
        throw new BadRequestException('The login is invalid');
      }
    }

    const token = await this.tokens.generateAccessToken(user)
    const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30*1000)

    const payload = this.buildResponsePayload(user, token, refresh)

    return {
      status: 'success',
      data: payload,
    }
  }

  @Get('/info_user')
  @UseGuards(JWTGuard)
  public async getUser (@Req() request) {
    const userId = request.user.id

    const user = await this.users.findForId(userId)

    return {
      status: 'success',
      data: user,
    }
  }

  @Get('/get_user/:id')
  @UseGuards(JWTGuard)
  public async getUserById (@Param() params) {
    const userId = params.id
    const user = await this.users.findForId(userId)

    return {
      status: 'success',
      data: user,
    }
  }

  @Get('/get_users')
  @UseGuards(JWTGuard)
  public async getListUser(@Req() request) {
    const userId = request.user.id

    const user = await this.users.findAll(userId)
    return {
      status: 'success',
      data: user,
    }
  }

  @Post('/refresh')
  public async refresh (@Body() body: RefreshRequest) {
    const { user, token } = await this.tokens.createAccessTokenFromRefreshToken(body.refresh_token)

    const payload = this.buildResponsePayload(user, token)

    return {
      status: 'success',
      data: payload,
    }
  }

  private buildResponsePayload (user: User, accessToken: string, refreshToken?: string): AuthenticationPayload {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      }
    }
  }

  @Delete('/delete_user')
  @UseGuards(JWTGuard)
  public async deleteUser(@Req() request) {
    const userId = request.user.id

    await this.users.deleteUser(userId)
    return {
      status: 'success',
      data: {
        message: `deleted the user ${userId} success`
      },
    }
  }
}
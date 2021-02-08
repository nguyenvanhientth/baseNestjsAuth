import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import configs from 'configs';

import { Profile } from 'src/models/profile.model';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Profile,
    ]),
    JwtModule.register({
      secret: configs.SECRET_KEY,
      signOptions: {
        expiresIn: configs.expiresIn
      }
    }),

  ],
  controllers: [
    ProfileController,
  ],
  providers: [
    ProfileService,
    ProfileRepository
  ],
  exports: [
    ProfileService,
    ProfileRepository
  ]
})
export class ProfileModule {}

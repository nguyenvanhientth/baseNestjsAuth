import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateProfileRequest {

  @IsNotEmpty({ message: 'A firt name is required to create!' })
  readonly firt_name: string

  @IsNotEmpty({ message: 'A last name is required to create!' })
  readonly last_name: string

  @IsNotEmpty({ message: 'A birthday is required to create!' })
  readonly birthday: Date

  @IsNotEmpty({ message: 'A firt address is required to create!' })
  readonly address: string

  @IsNotEmpty({ message: 'A emailis required to create!' })
  readonly mail: string

  @IsNotEmpty({ message: 'A phone number is required to create!' })
  @MinLength(10, { message: 'Your phone number must be at least 10 characters' })
  readonly phone_number: string
}

// export class RegisterRequest {
//   @IsNotEmpty({ message: 'An username is required' })
//   readonly username: string

//   @IsNotEmpty({ message: 'A password is required' })
//   @MinLength(6, { message: 'Your password must be at least 6 characters' })
//   readonly password: string
// }

// export class RefreshRequest {
//   @IsNotEmpty({ message: 'The refresh token is required' })
//   readonly refresh_token: string
// }
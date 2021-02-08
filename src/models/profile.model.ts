import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'profile', underscored: true })
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Column
  user_id: number

  @Column
  firt_name: string

  @Column
  last_name: string

  @Column
  birthday: Date

  @Column
  address: string

  @Column
  mail: string

  @Column
  phone_number: string
}
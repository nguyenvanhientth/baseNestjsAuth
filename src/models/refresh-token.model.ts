import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'refresh_tokens', underscored: true })
export class RefreshToken extends Model<RefreshToken> {
  @Column
  user_id: number
  // refresh token 
  @Column
  is_revoked: boolean
  // ngay het han
  @Column
  expires: Date
}
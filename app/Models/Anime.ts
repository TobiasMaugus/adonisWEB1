import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Anime extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome_anime: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(()=> User, {
    localKey: 'id',
    pivotForeignKey: 'anime_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'animes_users'  
  })
  public UsuarioViu: ManyToMany<typeof User>

  static get table(){
    return 'animes'
  }
}

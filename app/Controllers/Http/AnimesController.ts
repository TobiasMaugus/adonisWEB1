import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Anime from 'App/Models/Anime'
import StoreAnimeValidator from 'App/Validators/StoreAnimeValidator'

export default class AnimesController {
  public async index ({}: HttpContextContract) {
    const animeDB = await Anime.all()
    return animeDB
  }

  public async store ({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreAnimeValidator)
    const animeDB = await Anime.create({...data, userId: auth.user?.id})
    return animeDB
  }

  public async show ({params, response}: HttpContextContract) {
    try {
      const animeDB = await Anime.findOrFail(params.id)
      return animeDB  
    } catch (error) {
      response.status(400).send("Anime não encontrado!!!")
    }
  }

  public async update ({request, params, response}: HttpContextContract) {
    const {nome_anime} = await request.validate(StoreAnimeValidator)
    try {
      const animeDB = await Anime.findOrFail(params.id)
      animeDB.nome_anime = nome_anime
      await animeDB.save()
      return animeDB
    } catch (error) {
      response.status(400).send("Anime não encontrado!!!")  
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const animeDB = await Anime.findOrFail(params.id)   
      await animeDB.delete()
      return animeDB
    } catch (error) {
      response.status(400).send("Anime não encontrado!!!")    
    }
  }
}

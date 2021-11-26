import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnimesUser from 'App/Models/AnimesUser'
import StoreAnimesUserValidator from 'App/Validators/StoreAnimesUserValidator'

export default class AnimesUsersController {
  public async index ({}: HttpContextContract) {
    const animeuserDB = await AnimesUser.all()
    return animeuserDB
  }

  public async store ({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreAnimesUserValidator)
    const forunDB = await AnimesUser.create({...data, user_id: auth.user?.id})
    return forunDB
  }

  public async show ({params, response}: HttpContextContract) {
    try {
      const animeuserDB = await AnimesUser.findOrFail(params.id)
      return animeuserDB 
    } catch (error) {
      response.status(400).send("Anime não encontrado!!!")
    }
  }

  public async update ({request, params, response}: HttpContextContract) {
    const {user_id, animes_id} = await request.validate(StoreAnimesUserValidator)
    try {
      const forunDB = await AnimesUser.findOrFail(params.id)
      forunDB.user_id = user_id
      forunDB.animes_id = animes_id
      await forunDB.save()
      return forunDB
    } catch (error) {
      response.status(400).send("Anime não encontrado!!!")  
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const animeuserDB = await AnimesUser.findOrFail(params.id)   
      await animeuserDB.delete()
      return animeuserDB
    } catch (error) {
      response.status(400).send("Forun não encontrado!!!")    
    }
  }
}

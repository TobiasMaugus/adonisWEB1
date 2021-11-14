import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forun from 'App/Models/Forun'
import StoreForunValidator from 'App/Validators/StoreForunValidator'


export default class ForunsController {
  public async index ({}: HttpContextContract) {
    const forunDB = await Forun.all()
    return forunDB
  }

  public async store ({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreForunValidator)
    const forunDB = await Forun.create({...data, userId: auth.user?.id})
    return forunDB
  }

  public async show ({params, response}: HttpContextContract) {
    try {
      const forunDB = await Forun.findOrFail(params.id)
      return forunDB  
    } catch (error) {
      response.status(400).send("Forun não encontrado!!!")
    }
  }

  public async update ({request, params, response}: HttpContextContract) {
    const {nome_forun} = await request.validate(StoreForunValidator)
    try {
      const forunDB = await Forun.findOrFail(params.id)
      forunDB.nome_forun = nome_forun
      await forunDB.save()
      return forunDB
    } catch (error) {
      response.status(400).send("Forun não encontrado!!!")  
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const forunDB = await Forun.findOrFail(params.id)   
      await forunDB.delete()
      return forunDB
    } catch (error) {
      response.status(400).send("Forun não encontrado!!!")    
    }
  }
}

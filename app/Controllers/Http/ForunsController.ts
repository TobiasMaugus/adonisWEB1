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

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

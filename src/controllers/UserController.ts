import User from '../entity/User'
import Category from '../entity/Category'
import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

class UserController {
  async insert(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      const user = await getRepository(User).save({
        name,
        email,
        password,
        limit: 0,
        balance: 0,
      })

      await getRepository(Category).save([
        {
          name: 'Casa',
          user: user,
        },
        {
          name: 'Lazer',
          user: user,
        },
        {
          name: 'Compras',
          user: user,
        },
      ])
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async select(req: Request, res: Response) {
    try {
      const { id } = req.params

      const user = await getRepository(User)
        .createQueryBuilder('u')
        .where('u.id = :id', { id })
        .getOne()
      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userDefault = await getRepository(User)
        .createQueryBuilder('u')
        .where('u.id = :id', { id })
        .getOne()
      const name = req.body.name ?? userDefault?.name
      const password = req.body.password ?? userDefault?.password
      const balance = req.body.balance ?? userDefault?.name
      const limit = req.body.limit ?? userDefault?.name
      const user = await getRepository(User).update(id, {
        name,
        password,
        balance,
        limit,
      })

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const result = await getRepository(User)
        .createQueryBuilder('u')
        .where('u.email = :email', { email })
        .andWhere('u.password = :password', { password })
        .getOne()
      if (result) res.status(200).json(result)
      else res.status(400).send()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default new UserController()

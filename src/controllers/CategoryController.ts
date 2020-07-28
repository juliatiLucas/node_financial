import { getRepository } from 'typeorm'
import Category from '../entity/Category'
import { Request, Response } from 'express'

class CategoryController {
  async insert(req: Request, res: Response) {
    try {
      const { name, user } = req.body
      const category = await getRepository(Category).save({
        name: name,
        user: user,
      })
      return res.status(201).json(category)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async select(req: Request, res: Response) {
    try {
      const { user } = req.params
      const categories = await getRepository(Category)
        .createQueryBuilder('c')
        .where('c.user = :user', { user })
        .getMany()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await getRepository(Category).delete(id)
      return res.status(200).send()
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async group(req: Request, res: Response) {
    try {
      const { user } = req.params
      const categories = await getRepository(Category)
        .createQueryBuilder('c')
        .where('c.user = :user', { user })
        .leftJoinAndSelect('c.debits', 'debits')
        .getMany()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

export default new CategoryController()

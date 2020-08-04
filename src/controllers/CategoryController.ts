import { getRepository, getConnection } from 'typeorm'
import Category from '../entity/Category'
import { Request, Response } from 'express'
import Debit from '../entity/Debit'

class CategoryController {
  async insert(req: Request, res: Response) {
    try {
      const { name, user, color } = req.body
      const category = await getRepository(Category).save({
        name: name,
        user: user,
        color: color,
      })
      return res.status(201).json(category)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async select(req: Request, res: Response) {
    try {
      const { user } = req.params
      const categories: Category[] = await getRepository(Category)
        .createQueryBuilder('c')
        .where('c.user = :user', { user })
        .leftJoinAndSelect('c.debits', 'debits')
        .getMany()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name } = req.body

      getConnection()
        .createQueryBuilder()
        .update(Category)
        .set({ name: name })
        .where('id = :id', { id })
        .execute()
      return res.status(200).json()
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

  async debits(req: Request, res: Response) {
    try {
      const { category } = req.params
      const debits = await getRepository(Debit)
        .createQueryBuilder('d')
        .where('d.category = :category', { category })
        .getMany()
      return res.status(200).json(debits)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

export default new CategoryController()

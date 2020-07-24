import { getRepository } from 'typeorm'
import Debit from '../entity/Debit'
import { Response, Request } from 'express'

class DebitController {
  async insert(req: Request, res: Response) {
    try {
      const { description, value, user } = req.body
      const debit = await getRepository(Debit).save({
        description,
        value,
        user,
      })
      res.status(201).json(debit)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async getDebitsByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const debits = await getRepository(Debit)
        .createQueryBuilder('d')
        .where('d.user = :userId', { userId })
        .getMany()
      return res.status(200).json(debits)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await getRepository(Debit).delete(id)
      return res.status(200).send()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}

export default new DebitController()

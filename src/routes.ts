import express from 'express'
import userController from './controllers/UserController'
import debitController from './controllers/DebitController'

const router = express.Router()
router.post('/users', userController.insert)
router.post('/users/login', userController.login)
router.get('/users/:id', userController.select)
router.put('/users/:id', userController.update)
router.get('/users/:userId/debits', debitController.getDebitsByUser)

router.post('/debits', debitController.insert)
router.get('/debits/:id', debitController.delete)

export default router

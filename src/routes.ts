import express from 'express'
import userController from './controllers/UserController'
import debitController from './controllers/DebitController'
import categoryController from './controllers/CategoryController'

const router = express.Router()
router.post('/users', userController.insert)
router.post('/users/login', userController.login)
router.get('/users/:id', userController.select)
router.put('/users/:id', userController.update)
router.get('/users/:user/debits', debitController.getDebitsByUser)
router.get('/users/:user/categories', categoryController.select)
router.delete('/users/:user/categories/:id', categoryController.delete)
router.post('/users/:user/categories', categoryController.insert)

router.post('/debits', debitController.insert)
router.get('/debits/:id', debitController.delete)




export default router

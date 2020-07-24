import express from 'express'
import routes from './routes'
import { createConnection } from 'typeorm'

createConnection()
const app = express()
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 5000, () => console.log('RUNNING'))

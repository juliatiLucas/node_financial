import express from 'express'
import routes from './routes'
import { createConnection } from 'typeorm'

createConnection()
const app = express()
app.use(express.json())
app.use(routes)

app.listen(3000 || process.env.PORT, () => console.log('RUNNING'))

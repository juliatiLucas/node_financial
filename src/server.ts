import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'

createConnection()
const app = express()
app.use(bodyParser.json())
app.use(routes)

app.listen(process.env.PORT || 5000, () => console.log('RUNNING'))

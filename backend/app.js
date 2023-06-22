import bodyParser from 'body-parser'
import express from 'express'
import 'dotenv/config'
import { sequelize } from './sequelize.js'
import { indexRouter } from './router/indexRouter.js'
import cors from 'cors'

const app = express()

const { PORT } = process.env

const init = async () => {
  try {
    await sequelize.authenticate()
    console.log('Подключение к БД прошло успешно.');
  } catch (error) {
    console.error('Невозможно подключиться к БД:', error);
    process.exit(-1)
  }
}

app.use(bodyParser.json())
app.use(cors())

app.use('/api', indexRouter)

app.listen(PORT, async () => {
  await init()
  console.log(`App started on port ${PORT}`)
})
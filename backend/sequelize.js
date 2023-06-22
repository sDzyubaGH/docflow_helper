import { Sequelize } from "sequelize";
import 'dotenv/config'

const { DB_HOST, DB_PORT, DB_USER, DATABASE, DB_PASSWORD } = process.env

const sequelize = new Sequelize({ host: DB_HOST, database: DATABASE, password: DB_PASSWORD, username: DB_USER, port: DB_PORT, dialect: 'mysql' })

export { sequelize }


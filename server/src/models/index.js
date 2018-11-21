import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()
// const {
//   DATABASE_USER,
//   DATABASE_PASSWORD,
//   DATABASE_HOST,
//   DATABASE,
// } = process.env

// `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:5432/${DATABASE}`,
const sequelize = new Sequelize(process.env.HEROKU_PG_DB, {
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
  operatorsAliases: false,
})

// const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
//   dialect: 'postgres',
// })

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models

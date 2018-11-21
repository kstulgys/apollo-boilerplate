import Sequelize from 'sequelize'

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE,
} = process.env

//   'postgres://nimmnloonyebwg:30f86264c860a6c46e706c7fe200b080932f382932350f30658dc44703a797e5@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dce2jdo78v21el',
const sequelize = new Sequelize(
  `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:5432/${DATABASE}`,
  {
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
    operatorsAliases: false,
  },
)

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

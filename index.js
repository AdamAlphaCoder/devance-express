require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const sequelize = require('./sequelize')
const routes = require('./routes')

// Configures IP and port
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

async function start () {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    // Create express instnace
    const app = express()
    app.set('port', port)
    app.use(helmet())
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    app.use(express.json())

    app.use('/', routes)

    app.listen(port, host)

    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()

require('dotenv/config')
require('express-async-errors')
const AppError = require('./utils/appError')
const express = require('express')

const cors = require('cors')
const routes = require('./routes')
const database = require('./database/sqlite')

const uploadsConfig = require('./config/uploud')

// o app, serve para inicializar o express
const app = express()
app.use(express.json())
app.use(cors())
database()

app.use(routes)
app.use('/files', express.static(uploadsConfig.UPLOADS_FOLDERS))

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  console.log(error)
  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  })
})

// ports que o express vai ficar escultando as request, (solicitações).
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Serve is runnig on Port ${PORT}`))

const express = require('express')
require('dotenv').config()
require('express-async-errors')

const app = express()

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1', require('./routes/main'))
app.use('*', require('./middlewares/notFound'))
app.use(require('./middlewares/errorHandler'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)
})

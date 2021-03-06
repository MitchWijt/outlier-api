const express = require('express')

const middleware = require('./middleware')
const { router } = require('./routes/student')

const PORT = process.env.PORT || 1337

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}

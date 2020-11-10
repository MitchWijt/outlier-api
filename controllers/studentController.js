const makeHttpRequest = require('../utils/httpRequest')
const { studentService } = require('../services')

module.exports = {
  studentRequestHandler
}

function studentRequestHandler (req, res, next) {
  const httpRequest = makeHttpRequest(req)

  studentService(httpRequest)
    .then((data) => res.json(data))
    .catch((e) => next(e))
}

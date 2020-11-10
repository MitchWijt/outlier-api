const parsePathParams = require('./urlPathParamsParser')

module.exports = makeHttpRequest

function makeHttpRequest (req) {
  return {
    method: req.method,
    queryParams: req.query,
    body: req.body,
    pathParams: parsePathParams(req.path)
  }
}

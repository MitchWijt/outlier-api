const { parsePathParams, parseReqBodyToJson } = require('./httpRequestHelper')

module.exports = makeHttpRequest

function makeHttpRequest (req) {
  return {
    method: req.method,
    queryParams: req.query,
    body: parseReqBodyToJson(req.body),
    pathParams: parsePathParams(req.path)
  }
}

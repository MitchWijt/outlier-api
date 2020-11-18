module.exports = {
  parsePathParams,
  parseReqBodyToJson
}

function parsePathParams (uri) {
  const pathParams = uri.split('/')
  pathParams.splice(0, 1)

  const id = pathParams[0]
  pathParams.splice(0, 1)
  return {
    id: id,
    propertyNames: [...pathParams]
  }
}

function parseReqBodyToJson (body) {
  const keysArrayOfBodyData = Object.keys(body)

  if (keysArrayOfBodyData.length < 1) {
    return body
  }

  const jsonString = keysArrayOfBodyData[0]
  return JSON.parse(jsonString)
}

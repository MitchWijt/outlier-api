module.exports = parsePathParams

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

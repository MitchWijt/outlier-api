const {
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

const {
  throw404IfPropertyNotFoundOnObject,
  throw404IfFileDoesNotExist
} = require('../../utils/errors')

module.exports = {
  getStudent
}

async function getStudent (httpRequest) {
  const path = httpRequest.path
  const uriPropertyNames = httpRequest.pathParams.propertyNames

  await throw404IfFileDoesNotExist(fileExists(path))

  let studentJsonObject = await fetchJsonFromFile(path)

  for (const property of uriPropertyNames) {
    await throw404IfPropertyNotFoundOnObject(studentJsonObject, property)
    studentJsonObject = studentJsonObject[property]
  }

  return studentJsonObject
}

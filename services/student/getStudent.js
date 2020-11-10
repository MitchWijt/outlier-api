const {
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

const { notFound } = require('../../utils/errors')

module.exports = {
  getStudent
}

async function getStudent (httpRequest) {
  const path = `data/${httpRequest.pathParams.id}.json`
  const uriPropertyNames = httpRequest.pathParams.propertyNames

  if (!fileExists(path)) {
    throw notFound()
  }

  let studentJsonObject = await fetchJsonFromFile(path)

  for (const property of uriPropertyNames) {
    if (propertyDoesNotExistsOnObject(studentJsonObject, property)) {
      throw notFound()
    }

    studentJsonObject = studentJsonObject[property]
  }

  return studentJsonObject
}

const propertyDoesNotExistsOnObject = (object, property) => {
  return !object[property]
}

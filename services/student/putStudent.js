const {
  writeToFile,
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

module.exports = {
  putStudent
}

async function putStudent (httpRequest) {
  const path = `data/${httpRequest.pathParams.id}.json`
  const uriPropertyNames = httpRequest.pathParams.propertyNames
  const { body } = httpRequest
  let studentJsonObject = {}

  if (fileExists(path)) {
    studentJsonObject = await fetchJsonFromFile(path)
  }

  let studentDataIndex = studentJsonObject

  let lastProperty = null
  let counter = 0
  for (const property of uriPropertyNames) {
    if (!studentDataIndex[property]) {
      if (!lastProperty) {
        studentDataIndex[property] = {}
        studentDataIndex = studentDataIndex[property]
      } else {
        if (counter === httpRequest.pathParams.propertyNames.length - 1) {
          studentDataIndex[property] = { ...body }
        } else {
          studentDataIndex[property] = {}
        }
        studentDataIndex = studentDataIndex[property]
      }
    } else {
      studentDataIndex = studentDataIndex[property]
    }
    lastProperty = property
    counter++
  }

  writeToFile(path, studentJsonObject)
  return (await fetchJsonFromFile(path))
}

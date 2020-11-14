const {
  writeToFile,
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

const {
  throw404IfPropertyNotFoundOnObject,
  throw404IfFileDoesNotExist
} = require('../../utils/errors')

const { loopReachedLastElement } = require('../../utils/forLoopHelper')

module.exports = {
  deleteStudent
}

async function deleteStudent (httpRequest) {
  const path = httpRequest.path
  const uriPropertyNames = httpRequest.pathParams.propertyNames

  await throw404IfFileDoesNotExist(fileExists(path))

  const studentData = await fetchJsonFromFile(path)
  let studentDataIndex = studentData

  for (const property of uriPropertyNames) {
    await throw404IfPropertyNotFoundOnObject(studentDataIndex, property)

    if (loopReachedLastElement(property, uriPropertyNames)) {
      delete studentDataIndex[property]
    } else {
      studentDataIndex = studentDataIndex[property]
    }
  }

  writeToFile(path, studentData)
  return fetchJsonFromFile(path)
}

const {
  writeToFile,
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

const { notFound } = require('../../utils/errors')

module.exports = {
  deleteStudent
}

async function deleteStudent (httpRequest) {
  const path = `data/${httpRequest.pathParams.id}.json`
  const uriPropertyNames = httpRequest.pathParams.propertyNames

  if (!fileExists(path)) {
    throw notFound()
  }

  const studentData = await fetchJsonFromFile(path)
  let studentDataIndex = studentData

  for (const property of uriPropertyNames) {
    if (!studentDataIndex[property]) {
      throw notFound()
    }

    if (loopReachedLastElement(property, uriPropertyNames)) {
      delete studentDataIndex[property]
    } else {
      studentDataIndex = studentDataIndex[property]
    }
  }

  writeToFile(path, studentData)
  return (await fetchJsonFromFile(path))
}

const loopReachedLastElement = (currentLoopVar, loopArray) => {
  return currentLoopVar === loopArray[loopArray.length - 1]
}

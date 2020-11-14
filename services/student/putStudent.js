const {
  writeToFile,
  fileExists,
  fetchJsonFromFile
} = require('../../utils/fileSystem')

const { loopReachedLastElement } = require('../../utils/forLoopHelper')

module.exports = {
  putStudent
}

async function putStudent (httpRequest) {
  const path = httpRequest.path
  const uriPropertyNames = httpRequest.pathParams.propertyNames
  const { body } = httpRequest
  let studentJsonObject = {}

  if (fileExists(path)) {
    studentJsonObject = await fetchJsonFromFile(path)
  }

  const jsonObjectReference = studentJsonObject

  setAndTraversePropertiesFromUriToObject(uriPropertyNames, jsonObjectReference, body)

  writeToFile(path, studentJsonObject)
  return (await fetchJsonFromFile(path))
}

const setAndTraversePropertiesFromUriToObject = (uriPropertyNames, jsonObject, newBodyData) => {
  const loopVariables = {
    property: null,
    bodyData: newBodyData,
    uriPropertyNames: uriPropertyNames,
    jsonObject: jsonObject
  }

  for (const property of uriPropertyNames) {
    loopVariables.property = property

    if (!jsonObject[property]) {
      propertyDoesNotExistsOnObject(loopVariables)
    } else {
      propertyExistsOnObject(loopVariables)
    }
  }
}

const propertyDoesNotExistsOnObject = (loopVariables) => {
  if (loopReachedLastElement(loopVariables.property, loopVariables.uriPropertyNames)) {
    loopVariables.jsonObject = loopVariables.jsonObject[loopVariables.property] = { ...loopVariables.bodyData }
  } else {
    loopVariables.jsonObject = loopVariables.jsonObject[loopVariables.property] = {}
  }
}

const propertyExistsOnObject = (loopVariables) => {
  if (loopReachedLastElement(loopVariables.property, loopVariables.uriPropertyNames)) {
    loopVariables.jsonObject[loopVariables.property] = { ...loopVariables.bodyData }
  } else {
    loopVariables.jsonObject = loopVariables.jsonObject[loopVariables.property]
  }
}

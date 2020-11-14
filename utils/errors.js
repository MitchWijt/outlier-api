module.exports = {
  notFound,
  throw404IfPropertyNotFoundOnObject,
  throw404IfFileDoesNotExist
}

function notFound () {
  const err = new Error()
  err.statusCode = 404
  return err
}

async function throw404IfPropertyNotFoundOnObject (object, property) {
  if (!object[property]) {
    throw notFound()
  }
}

async function throw404IfFileDoesNotExist (fileExists) {
  if (!fileExists) {
    throw notFound()
  }
}

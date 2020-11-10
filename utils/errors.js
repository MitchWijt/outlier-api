module.exports = {
  notFound
}

function notFound () {
  const err = new Error()
  err.statusCode = 404
  return err
}

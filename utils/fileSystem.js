const fs = require('fs')

module.exports = {
  writeToFile,
  fetchJsonFromFile,
  fileExists
}

function writeToFile (path, newData) {
  fs.writeFileSync(path, JSON.stringify(newData, null, 2))
}

function fetchJsonFromFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}

function fileExists (path) {
  if (!fs.existsSync(path)) {
    return false
  }
  return true
}

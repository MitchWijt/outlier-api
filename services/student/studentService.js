const { getStudent } = require('./getStudent')
const { putStudent } = require('./putStudent')

module.exports = {
  studentService
}

async function studentService (httpRequest) {
  switch (httpRequest.method) {
    case 'GET' : return getStudent(httpRequest)
    case 'PUT' : return putStudent(httpRequest)
  }
}

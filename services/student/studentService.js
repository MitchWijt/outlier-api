const { getStudent } = require('./getStudent')

module.exports = {
  studentService
}

async function studentService (httpRequest) {
  switch (httpRequest.method) {
    case 'GET' : return getStudent(httpRequest)
  }
}

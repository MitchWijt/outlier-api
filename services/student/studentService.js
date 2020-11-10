const { getStudent } = require('./getStudent')
const { putStudent } = require('./putStudent')
const { deleteStudent } = require('./deleteStudent')

module.exports = {
  studentService
}

async function studentService (httpRequest) {
  switch (httpRequest.method) {
    case 'GET' : return getStudent(httpRequest)
    case 'PUT' : return putStudent(httpRequest)
    case 'DELETE': return deleteStudent(httpRequest)
  }
}

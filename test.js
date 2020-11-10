const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`
const putEndpointFileId = 'rn1abu1'

const server = require('./server')
const { removeFile } = require('./utils/fileSystem')

tape('should respond dagpauwoog 81', async function (t) {
  const url = `${endpoint}/rn1abu8/info/naw/address`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.equal(body, 'dagpauwoog 81')
    t.end()
  })
})

tape('should respond not found', async function (t) {
  const url = `${endpoint}/rn1ab10/info/naw/address`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.equal(body.error, 'Not Found')
    t.end()
  })
})

tape('should respond dagpauwoog 90', async function (t) {
  const url = `${endpoint}/rn1abu1/info/naw`
  const data = {
    address: 'dagpauwoog 90'
  }
  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)
    t.equal(body.info.naw.address, 'dagpauwoog 90')
    t.end()
  })
})

tape('cleanup', function (t) {
  removeFile(`data/${putEndpointFileId}.json`)
  server.close()
  t.end()
})

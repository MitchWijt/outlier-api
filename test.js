const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

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

tape('cleanup', function (t) {
  server.close()
  t.end()
})

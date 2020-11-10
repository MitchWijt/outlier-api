const express = require('express')
const router = express.Router()

module.exports = {
  router
}

const { studentRequestHandler } = require('../controllers')

router.get('/:studentId/*?', studentRequestHandler)
router.put('/:studentId/*?', studentRequestHandler)

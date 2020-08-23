const express = require('express')
const router = express.Router()
const home = require('./models/home.js')
const records = require('./models/records.js')
const users = require('./models/users')
const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
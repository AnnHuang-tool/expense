const express = require('express')
const router = express.Router()
const home = require('./models/home.js')
const records = require('./models/records.js')

router.use('/', home)
router.use('/records', records)

module.exports = router
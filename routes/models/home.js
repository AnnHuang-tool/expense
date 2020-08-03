const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(record => {
      return res.render('index', { record })
    })
    .catch(err => console.log(err))
})



module.exports = router
const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const handlebars = require('handlebars')

handlebars.registerHelper('equal', (category1, category2, options) => {
  if (category1 === category2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

router.get('/', (req, res) => {
  const categoryArray = []
  Category.find()
    .lean()
    .then(categories => categoryArray.push(...categories))
    .catch(error => console.log(error))
  Record.find()
    .lean()
    .then(record => {
      res.render('index', { record, categoryArray })

    })
    .catch(error => console.log(error))
})



module.exports = router
const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const Month = require('../../models/month.js')
const handlebars = require('handlebars')

handlebars.registerHelper('equal', (category1, category2, options) => {
  if (category1 === category2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Month.find()
    .lean()
    .sort({ month: 'asc' })
    .then(months => {
      return Category.find()
        .lean()
        .then(categories => {
          return Record.find({ userId })
            .lean()
            .then(record => {
              let totalAmount = 0
              for (let i = 0; i < record.length; i++) {
                totalAmount += record[i].amount
              }
              res.render('index', { record, categories, totalAmount, months })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

})

router.get('/filter', (req, res) => {
  const userId = req.user._id
  let { category, month } = req.query
  if (month) {
    if (month.length === 1) {
      month = `0${month}`
    }
  }
  Month.find()
    .lean()
    .sort({ month: 'asc' })
    .then(months => {
      return Category.find()
        .lean()
        .then(categories => {
          return Record.find({ userId, $or: [{ category: `${category}`, date: { $gte: `2020-${month}-01`, $lte: `2020-${month}-31` } }] })
            .lean()
            .then(record => {
              let totalAmount = 0
              for (let i = 0; i < record.length; i++) {
                totalAmount += record[i].amount
              }
              res.render('index', { record, categories, totalAmount, category, months, month: Number(month) })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
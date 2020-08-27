const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const Month = require('../../models/month.js')
const handlebars = require('handlebars')
const thisYear = new Date().getFullYear()
const beforeYear = thisYear - 5


handlebars.registerHelper('equal', (category1, category2, options) => {
  if (category1 === category2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

router.get('/', (req, res) => {
  const years = []
  for (let i = 0; i <= 5; i++) {
    years.push({ year: beforeYear + i })
  }
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
              res.render('index', { record, categories, totalAmount, thisYear, years, months })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

})

router.get('/filter', (req, res) => {
  const years = []
  let { category, month, year } = req.query
  const userId = req.user._id
  let filter = { userId }
  for (let i = 0; i <= 5; i++) {
    years.push({ year: beforeYear + i })
  }
  if (month) {
    if (month.length === 1) {
      month = `0${month}`
    }
  }
  if (month && category && year) {
    filter.date = { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-31` }
    filter.category = category
  } else if (month && category) {
    filter.date = { $regex: `-${month}-` }
    filter.category = category
  } else if (category && year) {
    filter.date = { $regex: `${year}` }
    filter.category = category
  } else if (month && year) {
    filter.date = { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-31` }
  } else if (year) {
    filter.date = { $regex: `${year}` }
  } else if (month) {
    filter.date = { $regex: `-${month}-` }
  } else if (category) {
    filter.category = category
  }
  Month.find()
    .lean()
    .sort({ month: 'asc' })
    .then(months => {
      return Category.find()
        .lean()
        .then(categories => {
          return Record.find(filter)
            .lean()
            .then(record => {
              let totalAmount = 0
              for (let i = 0; i < record.length; i++) {
                totalAmount += record[i].amount
              }
              res.render('index', { record, categories, totalAmount, category, thisYear, years, year: Number(year), months, month: Number(month) })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
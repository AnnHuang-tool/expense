const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const limitDate = require('../../models/dateUtils')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories, limitDate }))
    .catch(error => res.render('error'))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, store, date, category, amount } = req.body
  if (category === undefined) {
    const alert = '請選擇支出類別'
    return Category.find()
      .lean()
      .then(categories => {
        res.render('new', { alert, categories, name, store, date, amount, limitDate })
      })
      .catch(error => res.render('error'))
  }
  Record.create({ name, store, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error'))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      return Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          const category = record.category
          res.render('edit', { record, category, categories, limitDate })
        })
        .catch(error => console.log(error))
    })
    .catch(error => res.render('error'))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error'))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => res.render('error'))
})

module.exports = router
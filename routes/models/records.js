const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, store, date, category, amount } = req.body
  if (category === undefined) {
    const alert = '請選擇支出類別'
    return Category.find()
      .lean()
      .then(categories => {
        res.render('new', { alert, categories, name, store, date, amount })
      })
      .catch(error => console.log(error))
  }
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      return Record.findById(id)
        .lean()
        .then(record => {
          const category = record.category
          res.render('edit', { record, category, categories })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
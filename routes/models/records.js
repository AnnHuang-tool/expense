const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  if (category === undefined) {
    const alert = '請選擇支出類別'
    return Category.find()
      .lean()
      .then(categories => {
        res.render('new', { alert, categories, name, date, amount })
      })
      .catch(error => console.log(error))
  }
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const categoryArray = []
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => categoryArray.push(...categories))
    .catch(error => console.log(error))
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categoryArray }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, data, category, amount } = req.body
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
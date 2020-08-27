if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Month = require('../month.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  Promise.all(Array.from(
    { length: 12 },
    (_, i) => Month.create({ month: i + 1 })
  ))
    .then(() => process.exit())
    .catch(err => res.render('error'))
})
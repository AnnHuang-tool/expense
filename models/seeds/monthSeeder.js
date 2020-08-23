if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Month = require('../month.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  Promise.all(Array.from(
    { length: 12 },
    (_, i) => Month.create({ month: month[i] })
  ))
    .then(() => process.exit())
    .catch(error => console.log(error))
})
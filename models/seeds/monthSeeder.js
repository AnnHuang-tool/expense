const Month = require('../month.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  for (let i = 0; i < month.length; i++) {
    Month.create({ month: month[i] })
      .then(() => {
        // db.close()
        console.log('Month done!')
      })
      .catch(error => console.log(error))
  }
})
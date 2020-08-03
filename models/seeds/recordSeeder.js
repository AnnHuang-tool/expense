const Record = require('../record.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  Record.create(
    {
      name: '公車',
      category: '交通出行',
      date: '2020/7/16',
      amount: 20,
      categoryName: '交通出行',
      icon: '<i class="fas fa-shuttle-van my-auto"></i>'
    },
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2020/7/15',
      amount: 60,
      categoryName: '餐飲食品',
      icon: '<i class="fas fa-utensils my-auto"></i>'
    },
    {
      name: '電動',
      category: '休閒娛樂',
      date: '2020/7/17',
      amount: 500,
      categoryName: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam my-auto"></i>'
    },
    {
      name: '掃把',
      category: '家居物業',
      date: '2020/7/17',
      amount: 100,
      categoryName: '家居物業',
      icon: '<i class="fas fa-home my-auto"></i>'
    },
    {
      name: '糖果',
      category: '其他',
      date: '2020/7/17',
      amount: 100,
      categoryName: '其他',
      icon: '<i class="fas fa-pen my-auto"></i>'
    }
  )
  console.log('done!')
})
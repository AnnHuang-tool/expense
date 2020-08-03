const Category = require('../category.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  const categoryName = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  const icon = [
    '<i class="fas fa-home"></i>',
    '<i class="fas fa-shuttle-van"></i>',
    '<i class="fas fa-grin-beam"></i>',
    '<i class="fas fa-utensils"></i>',
    '<i class="fas fa-pen"></i>'
  ]
  for (let i = 0; i < categoryName.length; i++) {
    Category.create({ categoryName: categoryName[i], icon: icon[i] })
  }
  console.log('done!')
})
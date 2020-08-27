if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record.js')
const User = require('../user.js')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const SEED_USER = {
  name: '老爸',
  email: 'father@example.com',
  password: '12345678'
}

const SEED_DATA = [
  {
    name: '公車',
    category: '交通出行',
    date: '2020-07-16',
    amount: 50
  },
  {
    name: '午餐',
    store: '小佐便當店',
    category: '餐飲食品',
    date: '2020-07-15',
    amount: 60
  },
  {
    name: '模型',
    store: '模型店',
    category: '休閒娛樂',
    date: '2020-08-17',
    amount: 500
  },
  {
    name: '掃把',
    store: '寶雅',
    category: '家居物業',
    date: '2020-08-17',
    amount: 100
  },
  {
    name: '糖果',
    store: '7-11',
    category: '其他',
    date: '2019-07-17',
    amount: 50
  },
  {
    name: '遊樂園',
    store: '六福村',
    category: '休閒娛樂',
    date: '2020-06-17',
    amount: 1000
  },
  {
    name: '電腦',
    store: '燦坤',
    category: '休閒娛樂',
    date: '2020-06-17',
    amount: 30000
  },
  {
    name: '飲料',
    store: '全家超商',
    category: '餐飲食品',
    date: '2019-06-17',
    amount: 30
  }
]

db.once('open', () => {
  const user = () => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => {
          User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash })
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
  }
  user()
    .then(user => {
      const userId = user._id
      return Promise.all(
        SEED_DATA.map(data => {
          data.userId = userId
          return Record.create(data)
        })
      )
    })
    .then(() => {
      console.log('User done')
      process.exit()
    })
    .catch(error => res.render('error'))
})
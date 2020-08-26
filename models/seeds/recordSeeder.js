if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record.js')
const User = require('../user.js')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const SEED_USER = {
  name: 'User',
  email: 'user@example.com',
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
    date: '2020-07-17',
    amount: 500
  },
  {
    name: '掃把',
    store: '寶雅',
    category: '家居物業',
    date: '2020-07-17',
    amount: 100
  },
  {
    name: '糖果',
    store: '7-11',
    category: '其他',
    date: '2020-07-17',
    amount: 100
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
      const record = () => {
        return new Promise((resolve, reject) => {
          SEED_DATA.forEach(data => {
            data.userId = userId
            Record.create(data)
              .then(() => resolve())
              .catch(error => reject(error))
          })
        })
      }
      return Promise.all([record()])
    })
    .then(() => {
      console.log('User done')
      process.exit()
    })
    .catch(error => console.log(error))
})
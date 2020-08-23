const mongoose = require('mongoose')
const Schema = mongoose.Schema
const monthSchema = new Schema({
  month: {
    type: Number
  }
})

module.exports = mongoose.model('Month', monthSchema)
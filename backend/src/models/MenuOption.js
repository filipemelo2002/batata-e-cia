const mongoose = require('mongoose')

const MenuOptionSchema = mongoose.Schema({
  title: String,
  img_url: String,
  description: String,
  price: Number
})

module.exports = mongoose.model('menuoption', MenuOptionSchema)

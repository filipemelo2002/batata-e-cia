const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
  user: String,
  password_hash: String
})

module.exports = mongoose.model('admin', AdminSchema)

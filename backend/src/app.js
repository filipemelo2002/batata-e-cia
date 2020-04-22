const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const routes = require('./routes')
mongoose.connect('mongodb+srv://root:ovmRcXkZFda4Ptu4@cluster0-ipxq5.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(cors())
app.use(express.json())
app.use(routes)

module.exports = app

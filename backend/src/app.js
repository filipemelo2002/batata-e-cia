const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { errors } = require('celebrate')
const app = express()

const routes = require('./routes')
mongoose.connect('mongodb+srv://root:ovmRcXkZFda4Ptu4@cluster0-ipxq5.mongodb.net/batata-e-cia?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app

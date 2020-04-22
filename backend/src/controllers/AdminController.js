const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')

module.exports = {
  async create (req, res) {
    const { user, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const password_hash = bcrypt.hashSync(password, salt)

    const admin = await Admin.create({
      user, password_hash
    })
    return res.json(admin)
  }
}

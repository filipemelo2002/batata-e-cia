const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
module.exports = {

  async create (req, res) {
    const { user, password } = req.body

    if (!user || !password) return res.status(400).json({ message: 'missing parameters' })

    const admin = await Admin.findOne({
      user
    })

    if (!admin) return res.status(400).json({ message: 'user not found' })

    const verifyPass = bcrypt.compareSync(password, admin.password_hash)

    if (!verifyPass) return res.status(400).json({ message: 'wrong password' })

    return res.json(admin)
  }
}

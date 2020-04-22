const Admin = require('../models/Admin')

module.exports = async (req, res, next) => {
  const { auth_id } = req.headers

  if (!auth_id) return res.status(400).json({ message: 'missing auth_id header' })

  try {
    const admin = await Admin.findOne({
      _id: auth_id
    })
    if (admin) { next() }
  } catch (err) {
    res.status(400).json({ message: 'Admin not found' })
  }
}

const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    if (!token) {
      return res.status(401).json({ errors: [{ msg: "you are not authorized" }] })
    }
    const decoded = jwt.verify(token, 'your_secrete_key')
    if (!decoded) {
      return res.status(401).json({ errors: [{ msg: "you are not authorized" }] })
    }
    req.user = { id: decoded.userId }
    next()
  } catch (error) {
    res.status(401).json({ errors: [{ msg: "you are not authorized" }] })
  }
}

module.exports = isAuth





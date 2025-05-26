import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if(!token) {
    return res.status(401).json({ message: "Yêu cầu truy cập không hợp lệ"})
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.account = verified
    next()
  } catch (error) {
    res.status(400).json({message: "Token không hợp lệ"})
  }
}

export default verifyToken
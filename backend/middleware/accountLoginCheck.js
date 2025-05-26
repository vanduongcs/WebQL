const accountLoginCheck = (req, res, next) => {
  const { TenTK, MatKhau } = req.body

  if (MatKhau === '' && TenTK === '') {
    return res.status(400).json({ message: 'Vui lòng nhập tài khoản và mật khẩu' })
  }

  if (TenTK === '') {
    return res.status(400).json({ message: 'Vui lòng nhập tài khoản' })
  }

  if (MatKhau === '') {
    return res.status(400).json({ message: 'Vui lòng nhập mật khẩu' })
  }

  next()
}

export default accountLoginCheck

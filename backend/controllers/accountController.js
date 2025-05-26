import Account from '../models/Account.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { TenHienThi, Loai, TenTK, MatKhau } = req.body
    
    const existingAccount = await Account.findOne({ TenTK })
    if (existingAccount) {
      return res.status(400).json({ message: 'Tài khoản đã tồn tại'})
    }
    
    const hashedPassword = await bcrypt.hash(MatKhau, 10)

    const newAccount = new Account({ TenHienThi, Loai, TenTK, MatKhau: hashedPassword })
    await newAccount.save()
    res.status(201).json({ message: 'Đăng ký thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { TenTK, MatKhau } = req.body

    const dbAccount = await Account.findOne({ TenTK })

    const isMatch = await bcrypt.compare(MatKhau, dbAccount.MatKhau)
    if (!isMatch) {
      return res.status(400).json({message: 'Sai mật khẩu'})
    }

    const token = jwt.sign({ id: dbAccount._id}, process.env.JWT_SECRET)

    res.status(200).json({
      token,
      dbAccount: { id: dbAccount._id, TenHienThi: dbAccount.TenHienThi, TenTK: dbAccount.TenTK }
    })
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

const getAccounts = async (req, res) => {
  try {

    const account = await Account.find().select('-MatKhau'); // Ẩn mật khẩu
    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAccount = async (req, res) => {
  try {
    const { TenTK } = req.params;

    const account = await Account.findOne({ TenTK }).select('-MatKhau');
    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export default {
  register,
  login,
  getAccounts,
  getAccount
}
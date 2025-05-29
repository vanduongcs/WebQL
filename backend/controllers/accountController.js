import Account from '../models/Account.js'
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { Loai, TenHienThi, TenTaiKhoan, MatKhau } = req.body

    const existingAccount = await Account.findOne({ TenTaiKhoan })
    if (existingAccount) {
      return res.status(400).json({ message: 'Tài khoản đã tồn tại'})
    }

    // const hashedPassword = await bcrypt.hash(MatKhau, 10)

    // const newAccount = new Account({ TenHienThi, Loai, TenTaiKhoan, MatKhau: hashedPassword })
    const newAccount = new Account({ TenHienThi, Loai, TenTaiKhoan, MatKhau })
    await newAccount.save()

    res.status(201).json(newAccount)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { TenTaiKhoan, MatKhau } = req.body

    const dbAccount = await Account.findOne({ TenTaiKhoan })
    if (!dbAccount) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' })
    }

    const isMatch = MatKhau === dbAccount.MatKhau
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' })
    }

    const token = jwt.sign({ id: dbAccount._id }, process.env.JWT_SECRET)
    res.status(200).json({
      token,
      dbAccount: { id: dbAccount._id, TenHienThi: dbAccount.TenHienThi, TenTK: dbAccount.TenTK, MatKhau: dbAccount.MatKhau, Loai: dbAccount.Loai }
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAccounts = async (req, res) => {
  try {
    const account = await Account.find()
    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản nào' })
    }

    res.status(200).json(account)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.account.id)
    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }

    res.status(200).json(account)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateAccount = async (req, res) => {
  try {
    const { TenTaiKhoan } = req.params
    const updates = req.body
    const updatedAccount = await Account.findOneAndUpdate(
      { TenTaiKhoan },
      { $set: updates },
      { new: true }
    )
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }
    res.status(200).json(updatedAccount)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  register,
  login,
  getAccounts,
  getAccount,
  updateAccount
}
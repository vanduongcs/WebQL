import Account from '../models/Account.js'
import Result from '../models/Result.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { Loai, TenHienThi, TenTaiKhoan, MatKhau } = req.body

    const existingAccount = await Account.findOne({ TenTaiKhoan })
    if (existingAccount) {
      return res.status(400).json({ message: 'Tài khoản đã tồn tại' })
    }

    const newAccount = new Account({ Loai, TenHienThi, TenTaiKhoan, MatKhau })
    await newAccount.save();

    res.status(201).json({ message: 'Đăng ký thành công', data: newAccount })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { TenTaiKhoan, MatKhau } = req.body

    const dbAccount = await Account.findOne({ TenTaiKhoan })
    if(!dbAccount) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' })
    }

    const isMatch = MatKhau === dbAccount.MatKhau
    if(!isMatch) {
      return res.status(409).json({ message: 'Sai mật khẩu'})
    }

    const token = jwt.sign({ id: dbAccount._id }, process.env.JWT_SECRET)

    res.status(200).json({
      token,
      // dbAccount: { id: dbAccount._id, TenHienThi: dbAccount.TenHienThi, TenTaiKhoan: dbAccount.TenTaiKhoan, Loai: dbAccount.Loai }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find()

    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getAccount = async (req, res) => {
  try {
    // account lấy được từ VerifyToken decode token ra account.id
    const account = await Account.findById(req.account.id)

    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const updateAccount = async (req, res) => {
  try {
    const { TenTaiKhoan } = req.params;
    const updates = req.body;

    const updatedAccount = await Account.findOneAndUpdate(
      { TenTaiKhoan },
      { $set: updates },
      { new: true, runValidators: true }
    )

    res.status(200).json(updatedAccount)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}


const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params

    const referencedResult = await Result.findOne({ IDNguoiDung: id })
    if (referencedResult) {
      return res.status(400).json({ message: 'Không thể xóa tài khoản' })
    }

    const deletedAccount = await Account.findByIdAndDelete(id)

    res.status(200).json({ message: 'Xóa tài khoản thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

export default {
  register,
  login,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount 
}
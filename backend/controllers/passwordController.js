import Password from '../models/Password.js'

const addPassword = async (req, res) => {
  try {
    const { MatKhau, token } = req.body

    const newPassword = new Password({ MatKhau, token })
    await newPassword.save()

    res.status(201).json({ message: 'Thêm mật khẩu thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find()
    if (!passwords) {
      return res.status(404).json({ message: 'Không tìm thấy mật khẩu nào'})
    }

    res.status(200).json(passwords)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const updatePassword = async (req, res) => {
  try{
    const { MatKhau } = req.params
    const updates = req.body
    const updatedPassword = await Account.findOneAndUpdate(
      { MatKhau },
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

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params 

    const deletedExam = await Exam.findByIdAndDelete(id) 

    if (!deletedExam) {
      return res.status(404).json({ message: 'Không tìm thấy đợt thi để xóa' }) 
    }

    res.status(200).json({ message: 'Xóa đợt thi thành công' }) 
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

export default {
  addExam,
  getExams,
  updateExam,
  deleteExam
}
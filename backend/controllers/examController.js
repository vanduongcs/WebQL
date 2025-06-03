import Exam from '../models/Exam.js'
import Account from '../models/Account.js'

const addExam = async (req, res) => {
  try {
    const { TenChungChi, Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai } = req.body

    const newExam = new Exam({ TenChungChi, Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai })
    await newExam.save()

    res.status(201).json({ message: 'Thêm đợt thi thành công', data: newExam })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const updateExam = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedExam = await Exam.findByIdAndUpdate(id, { $set: updates }, { new: true })

    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params

    const referencedAccount = await Account.findOne({ KhoaThi: id })
    if (referencedAccount) {
      return res.status(400).json({ message: 'Không thể xóa đợt thi' })
    }

    res.status(200).json({ message: 'Xóa đợt thi thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

export default {
  addExam,
  getExams,
  updateExam,
  deleteExam
}
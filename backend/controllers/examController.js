import Exam from '../models/Exam.js'

const addExam = async (req, res) => {
  try {
    const { Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai } = req.body

    const newExam = new Exam({ Loai, LePhiThi, NgayThi, Buoi, SiSoToiDa, SiSoHienTai })
    await newExam.save()

    res.status(201).json({ message: 'Thêm đợt thi thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
    if (!exams) {
      return res.status(404).json({ message: 'Không tìm thấy đợt thi nào'})
    }

    res.status(200).json(exams)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const updateExam = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ) 

    if (!updatedExam) {
      return res.status(404).json({ message: 'Không tìm thấy đợt thi để cập nhật' })
    }

    res.status(200).json(updatedExam)
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
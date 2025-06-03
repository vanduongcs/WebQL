import Course from '../models/Course.js'
import Account from '../models/Account.js'

const addCourse = async (req, res) => {
  try {
    const { Loai, TenChungChi, HocPhi, NgayKhaiGiang, NgayKetThuc, Buoi, SiSoToiDa, SiSoHienTai, LichHoc } = req.body

    const newCourse = new Course({ Loai, TenChungChi, HocPhi, NgayKhaiGiang, NgayKetThuc, Buoi, SiSoToiDa, SiSoHienTai, LichHoc })
    await newCourse.save()

    res.status(201).json({ message: 'Thêm khóa ôn thành công', data: newCourse })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()

    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedCourse = await Course.findByIdAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )

    res.status(200).json(updatedCourse)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params

    const referencedAccount = await Account.findOne({
      $or: [{ KhoaHocDangHoc: id }, { KhoaHocDaHT: id }]
    })
    if (referencedAccount) {
      return res.status(400).json({ message: 'Không thể xóa khóa ôn' })
    }

    const deletedCourse = await Course.findByIdAndDelete(id)

    res.status(200).json({ message: 'Xóa khóa ôn thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
};

export default {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse 
}
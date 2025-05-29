import Course from '../models/Course.js'

const addCourse = async (req, res) => {
  try {
    const { Loai, HocPhi, NgayKhaiGiang, NgayKetThuc, Buoi, SiSoToiDa, SiSoHienTai, LichHoc } = req.body

    const newCourse = new Course({ Loai, HocPhi, NgayKhaiGiang, NgayKetThuc, Buoi, SiSoToiDa, SiSoHienTai, LichHoc })
    await newCourse.save()

    res.status(201).json({ message: 'Thêm khóa ôn thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    if (!courses) {
      return res.status(404).json({ message: 'Không tìm thấy khóa ôn nào'})
    }

    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedCourse = await Certificate.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ) 

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Không tìm thấy khóa ôn để cập nhật' })
    }

    res.status(200).json(updatedCourse)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params 

    const deletedCourse = await Course.findByIdAndDelete(id) 

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Không tìm thấy khóa ôn để xóa' }) 
    }

    res.status(200).json({ message: 'Xóa khóa ôn thành công' }) 
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

export default {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
}
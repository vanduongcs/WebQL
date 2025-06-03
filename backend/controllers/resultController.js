import Result from '../models/Result.js'

const addResult = async (req, res) => {
  try {
    const { IDNguoiDung, IDChungChi, Diem1, Diem2, Diem3, Diem4, NgayCap, NgayHetHan, TrangThai } = req.body

    const diemArray = [Diem1, Diem2]
    if (Diem3 !== undefined && Diem3 !== null) diemArray.push(Diem3)
    if (Diem4 !== undefined && Diem4 !== null) diemArray.push(Diem4)
    const DiemTK = diemArray.length > 0 ? parseFloat((diemArray.reduce((a, b) => a + b, 0) / diemArray.length).toFixed(2)) : 0

    const newResult = new Result({ IDNguoiDung, IDChungChi, Diem1, Diem2, Diem3, Diem4, DiemTK, NgayCap, NgayHetHan, TrangThai })
    await newResult.save()

    res.status(201).json({ message: 'Thêm kết quả thành công', data: newResult })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getResults = async (req, res) => {
  try {
    const results = await Result.find()

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const updateResult = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedResult = await Result.findByIdAndUpdate(id, { $set: updates }, { new: true })

    res.status(200).json(updatedResult)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const deleteResult = async (req, res) => {
  try {
    const { id } = req.params

    const deletedResult = await Result.findByIdAndDelete(id)

    res.status(200).json({ message: 'Xóa kết quả thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
};

export default {
  addResult,
  getResults,
  updateResult,
  deleteResult
}
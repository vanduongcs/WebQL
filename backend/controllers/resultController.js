import Result from '../models/Result.js'

const addResult = async (req, res) => {
  try {
    const { IDNguoiDung, IDChungChi, Diem1, Diem2, Diem3, Diem4, NgayCap, NgayHetHan, TrangThai } = req.body
    
    const diemArray = [Diem1, Diem2]
    if (Diem3 !== undefined) diemArray.push(Diem3)
    if (Diem4 !== undefined) diemArray.push(Diem4)

    const sum = diemArray.reduce((total, val) => total + val, 0)
    const DiemTK = parseFloat((sum / diemArray.length).toFixed(2))

    const newResult = new Result({ IDNguoiDung, IDChungChi, Diem1, Diem2, Diem3, Diem4, DiemTK, NgayCap, NgayHetHan, TrangThai })
    await newResult.save()

    res.status(201).json({ message: 'Thêm kết quả thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getResults = async (req, res) => {
  try {
    const results = await Result.find()
    if (!results) {
      return res.status(404).json({ message: 'Không tìm kết quả nào nào'})
    }

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const updateResult = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedResult = await Result.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    ) 

    if (!updatedResult) {
      return res.status(404).json({ message: 'Không tìm thấy kết quả để cập nhật' })
    }

    res.status(200).json(updatedResult)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const deleteResult = async (req, res) => {
  try {
    const { id } = req.params 

    const deletedResult = await Result.findByIdAndDelete(id) 

    if (!deletedResult) {
      return res.status(404).json({ message: 'Không tìm thấy kết quả để xóa' }) 
    }

    res.status(200).json({ message: 'Xóa kết quả thành công' }) 
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

export default {
  addResult,
  getResults,
  updateResult,
  deleteResult
}
import Certificate from '../models/Certificate.js'
import Result from '../models/Result.js'

const addCertificate = async (req, res) => {
  try {
    const { Loai, TenChungChi, LePhiThi, ThoiHan } = req.body

    const newCertificate = new Certificate({ Loai, TenChungChi, LePhiThi, ThoiHan })
    await newCertificate.save()

    res.status(201).json({ message: 'Thêm chứng chỉ thành công', data: newCertificate })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()

    res.status(200).json(certificates)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id, 
      { $set: updates },
      { new: true }
    )

    res.status(200).json(updatedCertificate)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params

    const referencedResult = await Result.findOne({ IDChungChi: id })
    if (referencedResult) {
      return res.status(400).json({ message: 'Không thể xóa' })
    }

    const deletedCertificate = await Certificate.findByIdAndDelete(id)
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Không tìm thấy chứng chỉ để xóa' })
    }

    res.status(200).json({ message: 'Xóa chứng chỉ thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

export default {
  addCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate 
}
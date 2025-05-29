import Certificate from '../models/Certificate.js'

const addCertificate = async (req, res) => {
  try {
    const { Loai, TenChungChi, CapDo, LePhiThi } = req.body

    const newCertificate = new Certificate({ Loai, TenChungChi, CapDo, LePhiThi })
    await newCertificate.save()

    res.status(201).json({ message: 'Thêm chứng chỉ thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
    if (!certificates) {
      return res.status(404).json({ message: 'Không tìm thấy chứng chỉ nào'})
    }

    res.status(200).json(certificates)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
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

    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Không tìm thấy chứng chỉ để cập nhật' })
    }

    res.status(200).json(updatedCertificate)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params 

    const deletedCertificate = await Certificate.findByIdAndDelete(id) 

    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Không tìm thấy chứng chỉ để xóa' }) 
    }

    res.status(200).json({ message: 'Xóa chứng chỉ thành công' }) 
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

export default {
  addCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate
}
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
    const certificate = await Certificate.find()
    if (!certificate) {
      return res.status(404).json({ message: 'Không tìm thấy chứng chỉ'})
    }

    res.status(200).json(certificate)
  } catch (error) {
    res.status(500).json({ error: error.message }) 
  }
}

export default {
  addCertificate,
  getCertificates
}
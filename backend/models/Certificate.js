import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    trim: true,
    enum: ['Tin học', 'Ngoại ngữ']
  },

  TenChungChi: {
    type: String,
    required: true,
    trim: true
  },

  LePhiThi: {
    type: Number,
    required: true
  },
  
  ThoiHan: {
    type: Number
  }
},
{ timestamps: true })

const Certificate = mongoose.model('Certificate', CertificateSchema)

export default Certificate
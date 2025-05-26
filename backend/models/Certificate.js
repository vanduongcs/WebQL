import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true
  },
  TenChungChi: {
    type: String,
    required: true
  },
  CapDo: {
    type: String,
    default: 'Không chia cấp'
  },
  LePhiThi: {
    type: Number,
    required: true
  }
},
{ 
  timestamps: true
});

const Certificate = mongoose.model('Certificate', CertificateSchema)

export default Certificate
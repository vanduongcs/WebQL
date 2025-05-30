import mongoose from 'mongoose'

const CertificateSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    trim: true,
    enum: ['Tin học', 'Ngoại ngữ']
  },
  NgonNgu: {
    type: String,
    required: true,
    trim: true
  },
  TenChungChi: {
    type: String,
    required: true,
    trim: true
  },
  CapDo: {
    type: String
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
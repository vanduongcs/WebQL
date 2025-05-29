import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: 'user',
    enum: ['user', 'admin']
  },
  TenHienThi: {
    type: String,
    required: true,
    trim: true
  },
  TenTaiKhoan: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 256
  },
  MatKhau: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256
  },
  KhoaHocDangHoc: {
    type: [String],
    default: []
  },
  KhoaHocDaHT: {
    type: [String],
    default: []
  },
  KhoaThi: {
    type: [String],
    default: []
  },
  ChungChiDaNhan: {
    type: [String],
    default: []
  }
},
{ 
  timestamps: true
});

const Account = mongoose.model('Account', AccountSchema)

export default Account
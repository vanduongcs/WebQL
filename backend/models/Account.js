import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    default: 'user'
  },
  TenHienThi: {
    type: String,
    required: true
  },
  TenTK: {
    type: String,
    required: true,
    unique: true
  },
  MatKhau: {
    type: String,
    required: true
  }
},
{ 
  timestamps: true
});

const Account = mongoose.model('Account', AccountSchema)

export default Account
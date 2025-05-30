import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  MatKhau: {
    type: String
  },
  token: {
    type: String
  }
},
{ 
  timestamps: true
});

const Account = mongoose.model('Account', AccountSchema)

export default Account
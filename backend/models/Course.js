import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    trim: true,
    enum: ['Ngoại ngữ', 'Tin học']
  },
  HocPhi: {
    type: Number,
    default: 0,
    min: 0
  },
  NgayKhaiGiang: {
    type: Date,
    required: true
  },
  NgayKetThuc: {
    type: Date,
    required: true
  },
  Buoi: {
    type: String,
    required: true,
    trim: true,
    enum: ['Sáng', 'Chiều', 'Tối']
  },
  SiSoToiDa: {
    type: Number,
    required: true,
    min: 1,
    max: 40
  },
  SiSoHienTai: {
    type: Number,
    default: 0,
    required: true,
    min: 0,
    max: 40
  },
  LichHoc: {
    type: String,
    required: true,
    trim: true,
    enum: ['T2 - T4 - T6', 'T3 - T5 - T7']
  }
},
{ 
  timestamps: true
});

const Course = mongoose.model('Course', CourseSchema)

export default Course
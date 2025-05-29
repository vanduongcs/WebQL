import mongoose from 'mongoose'

const ExamSchema = new mongoose.Schema({
  Loai: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['Ngoại ngữ', 'Tin học']
  },
  LePhiThi: {
    type: Number,
    required: true,
    min: 0
  },
  NgayThi: {
    type: Date,
    required: true
  },
  Buoi: {
    type: String,
    required: true,
    trim: true,
    enum: ['Sáng', 'Chiều']
  },
  SiSoToiDa: {
    type: Number,
    required: true,
    min: 0,
    max: 40
  },
  SiSoHienTai: {
    type: Number,
    required: true,
    min: 0,
    max: 40
  }
},
{ 
  timestamps: true
});

const Exam = mongoose.model('Exam', ExamSchema)

export default Exam
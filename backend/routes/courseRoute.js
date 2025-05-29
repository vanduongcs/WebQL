import express from 'express'
import courseController from '../controllers/courseController.js'

const router = express.Router()

router.post('/dang-ky', courseController.addCourse)
router.get('/tat-ca-tk', courseController.getCourses)
router.put('/cap-nhat-tai-khoan/:TenTaiKhoan', courseController.updateCourse)
router.delete('/xoa-khoa-on/:id', courseController.deleteCourse)
export default router
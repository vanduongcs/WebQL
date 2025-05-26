import express from 'express'
import accountController from '../controllers/accountController.js'
import accountLoginCheck from '../middleware/accountLoginCheck.js'

const router = express.Router()

router.post('/dang-ky', accountLoginCheck, accountController.register)
router.post('/dang-nhap', accountLoginCheck, accountController.login)
router.get('/tat-ca-tk', accountController.getAccounts)
router.get('/tim-tk/:TenTK', accountController.getAccount)
export default router
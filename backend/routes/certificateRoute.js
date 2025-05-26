import express from 'express'
import certificateController from '../controllers/certificateController.js'

const router = express.Router()
router.post('/them-chung-chi', certificateController.addCertificate)
router.get('/lay-tat-ca-chung-chi', certificateController.getCertificates)

export default router
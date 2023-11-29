const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getDoctorInforController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
} = require('../controllers/doctorCtrl');
// get the doctor information
router.post('/getDoctorInfo', authMiddleware, getDoctorInforController)
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);
router.post('/update-status', authMiddleware, updateStatusController);
module.exports = router;
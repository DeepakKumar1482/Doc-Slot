const express = require('express')
const multer = require('multer')
const path = require('path');
const router = express.Router()
const { loginController, registerController, authController, applyDoctorController, getAllNotificationsController, deleteAllNotificationsController, getallDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentController, userProfileImageController, uploadImageController } = require('../controllers/userCtrl.js')
const authMiddleware = require('../middlewares/authMiddleware')
    // This router is for login
router.post('/login', loginController)
router.post('/register', registerController)
router.post('/getUserData', authMiddleware, authController)
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.post('/get-all-notification', authMiddleware, getAllNotificationsController);
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationsController);
router.get('/getallDoctors', authMiddleware, getallDoctorsController);
// Route for booking appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);
// for appointment
router.get('/user-appointment', authMiddleware, userAppointmentController);
// User Profile Routes
router.post('/profile-image', userProfileImageController);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'file_' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

router.post('/upload', authMiddleware, upload.single('file'), uploadImageController);

module.exports = router
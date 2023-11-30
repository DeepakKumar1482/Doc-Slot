const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllDoctorsController, getAllUsersController, changeAccountStatusController } = require('../controllers/adminCtrl')
router.get('/getAllUsers', authMiddleware, getAllUsersController)
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
module.exports = router;
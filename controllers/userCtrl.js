const { response } = require('express');
const userModel = require('../models/userModels')
const doctorModel = require('../models/doctorModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appointmentModel = require('../models/appointmentModel.js');
const moment = require('moment');
const multer = require('multer');
const CircularJSON = require('circular-json');
const registerController = async(req, res) => {
    try {
        const existinguser = await userModel.findOne({ email: req.body.email });
        if (existinguser) {
            return res.status(200).send({ message: 'User Already Exsit', success: false });
        }
        const password = req.body.password
            // This is for the hashing of the password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);
        req.body.password = hashedpassword
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(200).send({
            message: 'Successfully registered',
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "There is an error"
        })
    }
}
const loginController = async(req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        console.log("This is Login user created -> ", user)
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }
        const ismatch = await bcrypt.compare(req.body.password, user.password);
        if (!ismatch) {
            return res.status(200).send({ message: 'Invalid Credntials', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({
            message: "Successfully login",
            success: true,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error in login" })
    }
}
const authController = async(req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined
        if (!user) {
            return res.status(200).send({ message: "User not found", success: false })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Auth Error", success: false });
    }
}
const applyDoctorController = async(req, res) => {
    try {
        const newDoctor = await doctorModel({...req.body, status: "pending" });
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/docotrs',
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: "Doctor Account Applied SUccessfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error WHile Applying For Doctotr",
        });
    }
};
const getAllNotificationsController = async(req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seennotification = await user.seennotification
        const notification = await user.notification
        console.log("This is Notification part", ...notification);
        await seennotification.push(...notification)
        user.notification = []
            // user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: "All Notifications marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in notification",
            success: false,
            error
        })
    }
}
const deleteAllNotificationsController = async(req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Notification deleted successfully',
            data: updatedUser
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Error in notification",
            success: false,
            e
        })
    }
}
const getallDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({ status: 'approved' })
        res.status(200).send({
            success: true,
            message: 'Doctors data fetched successfully',
            data: doctors
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "Error Doctors data fetching",
            e
        })
    }
}
const bookAppointmentController = async(req, res) => {
    try {
        // req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        // req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending';
        const newappointment = new appointmentModel(req.body);
        await newappointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId })
        user.notification.push({
            type: 'New-appointment-request',
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onCLickPath: '/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: 'appointment booked successfully'
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "Error while booking the appointment",
            e
        })
    }
}
const bookingAvailabilityController = async(req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gt: fromTime,
                $lte: toTime
            }
        })
        if (appointments.length > 0) {
            return res.status(200).send({
                message: 'Appointment is not available at this time',
                success: true
            })
        } else {
            return res.status(200).send({
                message: "Appointment is available",
                success: true
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error while searching for availability',
            success: false,
            e
        })
    }
}
const userAppointmentController = async(req, res) => {
        try {
            const appointments = await appointmentModel.find({ userId: req.body.userId })
            res.status(200).send({
                success: true,
                message: 'User Appointments fetched successfully',
                data: appointments
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                message: 'Error in appointment list',
                e
            })
        }

    }
    // controller for user profile image save data
const userProfileImageController = async(req, res) => {
        try {
            const image = req.body.imageURL;
            const user = req.body.User;
            const newuser = await userModel.findOne({ _id: user._id });
            newuser.image = image;
            await newuser.save();
            res.status(201).send('Image URL saved to the database.');
        } catch (error) {
            res.status(500).send('Error: ' + error.message);
        }
    }
    // const uploadImageController = async(req, res) => {
    //     const storage = multer.diskStorage({
    //         destination: function(req, file, cb) {
    //             return cb(null, './uploads')
    //         },
    //         filename: function(req, file, cb) {
    //             return cb(null, `${Date.now()}-${file.originalname}`);
    //         }
    //     })
    //     const upload = multer({
    //         storage: storage
    //     })
    //     try {
    //         upload.single('profileImage')
    //         console.log(req.file)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

const uploadImageController = async(req, res) => {
    try {
        // const d = await CircularJSON.stringify(req)
        // const data = d.body
        // const path = d.file.path
        // console.log("This is body =>" + data)
        // console.log("This is path =>" + path)
        // const user = await userModel.findById(req.body._id);
        // user.image = req.file.path;
        // console.log(req.file.path)
        // console.log(req)
        // console.log(req.file)
        // console.log(req.file.name)
        const p = req.file.path
        const jdata = CircularJSON.stringify(req)
        console.log(jdata)
        console.log(jdata.filename)
        const user = await userModel.findById(req.body.userId)
            // user.save();
        console.log(user.name)
        res.status(200).send({
            success: true,
            message: 'Image uploaded successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in image upload'
        })
    }
};


module.exports = {
    registerController,
    loginController,
    authController,
    applyDoctorController,
    getAllNotificationsController,
    deleteAllNotificationsController,
    getallDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    bookingAvailabilityController,
    bookAppointmentController,
    userAppointmentController,
    userProfileImageController,
    uploadImageController
}
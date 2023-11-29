const appointmentModel = require('../models/appointmentModel.js');
const doctorModel = require('../models/doctorModel.js');
const userModel = require('../models/userModels.js');
const nodemailer = require('nodemailer');

const getDoctorInforController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'Doctor data fetched successfully',
            data: doctor
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Error in fetching doctor details',
            e
        })
    }
}
const updateProfileController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(201).send({
            success: true,
            message: 'Profile updated successfully',
            data: doctor
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Error in updation of profile',
            e
        })
    }
}
const getDoctorByIdController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: 'single doctor data found successfully',
            data: doctor
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Error in Fethiching the single Doctor',
            e
        })
    }
}
const doctorAppointmentsController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        const appointments = await appointmentModel.find({ doctorId: doctor._id });
        // const user = await userModel.findOne({ _id: appointments.userInfo })
        const users = [];
        for (const appointment of appointments) {
            const user = await userModel.findOne({ _id: appointment.userInfo });
            users.push(user);
        }
        res.status(200).send({
            success: true,
            message: 'appointment fetched successfully',
            data: {
                users: users,
                appointments: appointments
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error in doctor appointments',
            success: false,
            e
        })
    }
}
const updateStatusController = async(req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {
            status
        })
        const user = await userModel.findOne({ _id: appointments.userId })
        const notification = user.notification
        notification.push({
            type: 'Status update',
            message: `Your appointment has been ${status}`,
            onCLickPath: '/doctor-appointments'
        })
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Status Updated',
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'error in update status',
            success: false,
            e
        })
    };
}
module.exports = { getDoctorInforController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, doctorAppointmentsController, updateStatusController, updateStatusController };
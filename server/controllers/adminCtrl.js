const { request } = require('express')
const doctorModel = require('../models/doctorModel.js')
const userModel = require('../models/userModels.js')
const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "Users data",
            data: users
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: "Error while fetching users",
            success: false,
            err
        })
    }
}
const getAllDoctorsController = async(req, res) => {
        try {
            const doctors = await doctorModel.find({})
            res.status(200).send({
                success: true,
                message: "Doctors data",
                data: doctors
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                success: false,
                message: "Error while fetching Doctors",
                e
            })
        }
    }
    // Doctor account status controller
const changeAccountStatusController = async(req, res) => {
    try {
        const { doctorId, status } = await req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status })
        const user = await userModel.findOne({ _id: doctor.userId })
        const notification = user.notification
        const maxlength = 1;
        if (notification.length <= maxlength) {
            notification.push({
                type: 'doctor-account-requested-updated',
                message: `Your Doctor account request has ${status}`
            })
        }
        user.isDoctor = status === 'approved' ? true : false;
        // if (doctor.status === 'approved') {
        //     user.isDoctor = true;
        // }
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Account status updated',
            data: doctor,
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "Error while fetching Account Status",
            e
        })
    }
}
module.exports = { getAllDoctorsController, getAllUsersController, changeAccountStatusController };
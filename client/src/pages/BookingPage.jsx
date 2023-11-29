import Layout from "../components/layout";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { message ,DatePicker,TimePicker, Form} from 'antd';
import axios from 'axios';
import moment from 'moment';
import '../styles/Home.css';
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import {useDispatch,useSelector}from 'react-redux'

function BookingPage() {
    const{user}=useSelector(state=>state.user)
    const [doctors, setDoctors] = useState([]);
    const[date,setDate]=useState(null);
    const [time,setTime]=useState(null);
    // const [isAvailable,setIsAvailable]=useState(false);
    const [timedata,setTimedata]=useState();
    const params = useParams();
    const dispatch=useDispatch();
    const startTime = doctors.timings ? doctors.timings[0] : null;
    const endTime = doctors.timings ? doctors.timings[1] : null;

    const newstartTime = startTime ? new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const newendTime = endTime ? new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
const handleBooking=async()=>{
    try{
        // if(!date && !time){
        //     return alert("Date and time required")
        // }
        dispatch(showLoading())
        const res=await axios.post('/api/v1/user/book-appointment',{
            doctorId:params.doctorId,
            userId:user._id,
            doctorInfo:doctors,
            userInfo:user,
            time:time,
            date:date,
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }
    }
    catch(e){
       dispatch(showLoading())
        console.error(e);
        message.error("error in booking appointment")
       dispatch(hideLoading());
    }
}
const getDoctor = async () => {
    try {
        const res = await axios.post('/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        if (res.data.success) {
            setDoctors(res.data.data);
        } else {
            message.error("Error while getting Doctor");
        }
    } catch (e) {
        console.log(e);
        message.error(e);
    }
}
// const handleAvailablity=async()=>{
//     try{
//         dispatch(showLoading());
//         const res=await axios.post('/api/v1/user/booking-availability',
//         {doctorId:params.doctorId,date,time},
//         {
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem('token')}`
//             }
//         }
//         );
//         dispatch(hideLoading());
//         if(res.data.success){
//             setIsAvailable(true);
//             message.success(res.data.message)
//         }else{
//             message.error(res.data.message)
//         }
//     }catch(e){
//         dispatch(hideLoading())
//         console.log(e);
//         message.error(e)
//     }
// }
const handleBoth=async()=>{
    await handleBooking();
}
    useEffect(() => {   
        getDoctor();
    }, []); 

    return (
        <Layout>
            <div className="booking-parent">
                <div className="booking-heading">
                    <h1>Book Your Appointment</h1>
                </div>
                <div className="booking-details">
                        <div className="abc">
            <div class="courses-container1">
	            <div class="course">
		<div class="course-info1">
            <div className="left-book">
        <h1 style={{ fontSize: '20px' }}>Dr. {doctors.firstName} {doctors.lastName}</h1>
                            <h1 style={{fontSize:'13px',fontWeight:'lighter'}}>Fees :- {doctors.fees}</h1>
                            {startTime && endTime && <h1 style={{fontSize:'13px',fontWeight:'lighter'}}>Timings :- {newstartTime} - {newendTime}</h1>}
        </div>
        <div className="picker">
<TimePicker className="date" format="HH:mm"  onChange={(value)=>{
    setTime(value.format("HH:mm"))}}/>

<DatePicker className="date" onChange={(value)=>{
    setDate(value.format("DD-MM-YYYY"))}}/>
</div>
<button className="btn" style={{marginRight:'60px',width:'300px'}} onClick={handleBoth}  >Consult Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
        </Layout>
    );
}

export default BookingPage;

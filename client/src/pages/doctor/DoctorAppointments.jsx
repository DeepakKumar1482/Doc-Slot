import React from 'react'
import Layout from '../../components/layout.jsx'
import { useState ,useEffect} from "react"
import axios from 'axios'
import {Table, message}from 'antd'
import moment from 'moment'
import {useSelector}from 'react-redux'
import '../../styles/Booking.css'
const DoctorAppointments = () => {
    const [appointments,setAppointments]=useState([])
    const [user,setUser]=useState([])
    const getAppointments=async()=>{
        try{
            const res=await axios.get('/api/v1/doctor/doctor-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data.appointments);
                setUser(res.data.data.users)
            }
        }catch(e){
            console.log(e);
            message.error("There is an error in doctor appointments")
        }
    }
    useEffect(()=>{
        getAppointments();
    },[])
    const handleStatus=async(record,status)=>{
        try{
            const res=await axios.post('/api/v1/doctor/update-status',{appointmentsId:record._id,status},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                message.success (res.data.message)
                getAppointments()
            }
        }catch(e){
            console.log(e);
            message.error(e)
        }
    }
    const getUserFullName = (userId) => {
        const matchingUser = user.find((u) => u._id === userId);
        return matchingUser ? matchingUser.name : 'Unknown';
      };
      const getUserPhone=(userId)=>{
        const matchingphone=user.find((u)=>u._id===userId);
        return matchingphone?matchingphone.email:'Unknown';
      }
      const formatDateTime = (date, time) => {
        const formattedDate = moment(date,'DD-MM-YYYY').format('MMMM D, YYYY');
        const formattedTime = moment(time, 'HH:mm').format('h:mm A');
        return `${formattedDate} ${formattedTime}`;
      };
    
    const columns=[
        {
            title: 'Name',
            dataIndex: 'userId',
            className:'name',
            render: (text, record) => (
              <span>
                {getUserFullName(record.userId)}
              </span>
            ),
          },
          {
            title:'Email id',
            className: 'email',
            render:(text,record)=>(
                <span>
                    {getUserPhone(record.userId)}
                </span>
            )
        },
        {
            title:'Date & Time',
            dataIndex:'date',
            className: 'datetime',
            render:(text,record)=>(
                <span>
                     {formatDateTime(record.date, record.time)}
                </span>
            )
        },{
            title:'Status',
            dataIndex:'status',
        },{
            title:'Actions',
            dataIndex:'actions',
            className:'action',
            render:(tex,record)=>(
                <div className="d-flex">
                    {record.status==='pending'&&(
                        <div className="par-btn">
                           <div className='btnA'> <button className='btn1 ' onClick={()=>handleStatus(record,'approved')}>Approve</button></div>
                           <div className='btnB'> <button className='btn2' onClick={()=>handleStatus(record,'rejected')}>Reject</button></div>
                        </div>
                    )}
                </div>
            )
        }
    ]
  return (
    <Layout>
        <div className='appoint-parent'>
            <div style={{textAlign:'center',height:'50px'}}>
            <div className='child-app'>
            <h1>List Of Appointments</h1>
            </div>
            </div>
            <div className='DoctorList'>
            <Table columns={columns} dataSource={appointments}/>   
            </div>
            </div>
    </Layout>
  )
}

export default DoctorAppointments
import { useState ,useEffect} from "react"
import Layout from "../components/layout"
import axios from 'axios'
import {Table, message}from 'antd'
import moment from 'moment'
import '../styles/Booking.css'
const Appointments=()=>{
    const [appointments,setAppointments]=useState([])
    const getAppointments=async()=>{
        try{
            const res=await axios.get('/api/v1/user/user-appointment',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
        }catch(e){
            console.log(e);
            message.error(e)
        }
    }
    useEffect(()=>{
        getAppointments();
    },[])
    const columns=[
        {
            title:'ID',
            dataIndex:'_id',
        },
        // {
        //     title:'Name',
        //     dataIndex:'name',
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.firstName}{record.doctorId.lastName}
        //         </span>
        //     )
        // },{
        //     title:'Phone',
        //     dataIndex:'phone',
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     )
        // },
        {
            title:'Date & Time',
            dataIndex:'date',
            render:(text,record)=>(
                <span>
                    {record.date}{"  "}{record.time}
                </span>
            )
        },{
            title:'Status',
            dataIndex:'status',
        }
    ]
    return (
        <Layout>
            <div className="appoint-parent">
            <div style={{textAlign:'center',height:'50px'}}>
            <div className='child-app'>
            <h1>Appointments</h1>
            </div>
            </div>
            <div className="DoctorList">
            <Table columns={columns} dataSource={appointments}/>
            </div>
            </div>
        </Layout>
    )
}
export default Appointments
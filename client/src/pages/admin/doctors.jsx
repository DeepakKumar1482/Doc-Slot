import React ,{useState,useEffect} from "react";
import '../../styles/admin.css'
import axios from "axios";
import Layout from "../../components/layout"
import {message,Tabs,Table,columns}from 'antd'
function Doctors(){
    const handleApproval=async(record,status)=>{
        try{
            const res=await axios.post('/api/v1/admin/changeAccountStatus',
            {doctorId:record._id,userId:record.userId,status:status},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload()
            }
        }catch(e){
            console.log(e);
            message.error('Doctor Status is not updated');
        }
    }
    const [doctors,setDoctors]=useState()
    const getdoctors= async()=>{
        try{
            const res=await axios.get('/api/v1/admin/getAllDoctors',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                await setDoctors(res.data.data);
            }
        }catch(e){
            console.error(e);
            message.error("Not getting Doctors details");
        }
    }
    useEffect(()=>{
        getdoctors()
    },[])
    const columns=[
        {
            title:'Name',
            dataIndex:'firstName',
            className:'name name1',
        },
        {
        title:'Phone',
        dataIndex:'phone',
        className:'name name1',
    },{
    title:'Fees',
    dataIndex:'fees',
    className:'name name1',
    },{
    title:'Action',
    dataIndex:'actions',
    className:'doc-btn',
    render:(text,record)=>(
        <div className="d-flex approve">
            {record.status==="pending"?(
                <button className="btn btn-success app" onClick={()=>handleApproval(record,"approved")}>Approve</button>
            ):(
                <button className="btn btn-danger app">Reject</button>
            )
            }
        </div>
    ),
    }
    ]    
    return (
        <Layout>
                    <div className="doctors">
                    <div style={{'textAlign':'center','margin-bottom':'20px','marginTop':'20px',}}>
                            <h1 > Doctors Details</h1>
                    </div>
                    <div className='table-container tb'>
                            <Table className='tb' columns={columns} dataSource={doctors}/>
                    </div>
                    </div>
                </Layout>
    )
}
export default Doctors
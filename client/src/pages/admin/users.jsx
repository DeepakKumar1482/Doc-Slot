    import Layout from '../../components/layout.jsx'
    import React,{useState,useEffect} from 'react';
    import {message,Table}from 'antd';
    import '../../styles/admin.css'
    import axios from 'axios';
    function Users(){
        const [users,setUsers]=useState([])
        const getUsers=async()=>{
            try{
                const res=await axios.get('/api/v1/admin/getAllUsers',{
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(res.data.success){
                await setUsers(res.data.data);
                }   
            }catch(e){
            console.log(e)
            message.error("Error while Fetching user");
            }
        }
        useEffect(()=>{
            getUsers();
        },[])
        const columns=[
            {
                title:'Name',
                dataIndex:'name',
                className:'name',
            },{
                title:'Email',
                dataIndex:'email',
                className: 'email',
            },
            {
                title:'Doctor',
                dataIndex:'isDoctor',
                className: 'isdoctor',
                render:(text,record)=>
                    <span>{record.isDoctor?'Yes':'No'}</span>
            },{
                title:'Actions',
                dataIndex:'actions',
                className: 'action',
                render:(text,record)=>(
                    <div className='d-flex'>
                        <button className='btn btn-danger my-button actions'>Block</button>
                    </div>
                )
            }
        ]
        return(
                <Layout>
                    <div>
                        <div style={{'textAlign':'center','margin-bottom':'20px','marginTop':'20px'}}>
                    <h1> Users Details</h1>
                    </div>
                    <div className='table-container'>
                    <Table className='tb' columns={columns} dataSource={users}/>
                    </div>
                    </div>
                </Layout>
        )
    }
    export default Users
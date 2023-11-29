import React,{useState} from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import {message}from 'antd'
const UserProfile = () => {
  const [file,setfile]=useState()
  const handleUplaod=async(e)=>{
    console.log(e)
    try{
      const formdata=new FormData()
    formdata.append('file',file)
    // const f=JSON.stringify(formdata)
    const res=await axios.post('/api/v1/user/upload',formdata,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(res.data.success){
      message.success(res.data.message)
    }
    }catch(e){
      message.error(e);
    }
  }
  return (
    <Layout>
    <div>
      <input type="file" onChange={e=>setfile(e.target.files[0])} />
      <button onClick={handleUplaod}>Upload</button>
    </div>
    </Layout>
  )
}

export default UserProfile
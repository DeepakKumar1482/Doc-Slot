import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import DoctorList from '../components/DoctorList'
import {Row}from 'antd'
import '../styles/Home.css'
const Home = () => {
  const [doctors,setDoctors]=useState()
  const getUserData=async()=>{
    try{
      const res=await axios.get('/api/v1/user/getallDoctors',
      {
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
      if(res.data.success){
        setDoctors(res.data.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUserData();
  },[])
  return (
        <Layout >  
          <div className='doclayout'>
          {doctors &&doctors.map(doctor=>(
            <DoctorList doctor={doctor}></DoctorList>
          ))}
          </div>
        </Layout>
  )
}

export default Home
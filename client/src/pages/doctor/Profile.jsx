import React ,{useState,useEffect} from 'react';
import Layout from '../../components/layout';
import{useSelector,useDispatch} from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import {message,Input,TimePicker,Form,Row}from 'antd'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import '../../styles/ApplyDoctor.css';
import moment from 'moment';
function Profile(){
    const {user}=useSelector(state=>state.user)
    const [doctor,setDoctor]=useState(null)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleFinish=async(values)=>{
        console.log(values);   
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/doctor/updateProfile',{...values,userId:user._id,timings:[
                moment(values.timings[0]),
                moment(values.timings[1])
            ]},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success (res.data.message)
                navigate('/')
            }else{
                dispatch(hideLoading())
                message.error (res.data.message)
            }
        }
        catch(error){
            console.log("This is the actual err=>  ",error);
            message.error('something went wrong');
            dispatch(hideLoading())
        }
    }
    const getDoctorInfo=async()=>{
        try{
            const res=await axios.post('/api/v1/doctor/getDoctorInfo',{userID:params.id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getDoctorInfo()
    },[]) 
    return (
        <Layout>
            {doctor && (
                <div className='all'>
                <div className='Form'>
                <div className='heading'><h1>Profile</h1></div>
                    <h1>Personal Details</h1>
                <Form layout='vertical' onFinish={handleFinish} className="parent" initialValues={{
                    ...doctor,
                    timings:[
                        moment(doctor.timings[0]),
                        moment(doctor.timings[1])
                    ]
                }}>                    
                <Row>
                        <div className='doc-form'>
                            <Form.Item label="First Name" name='firstName' required rules={true} >
                                <Input id='firstName' type='text'/>
                            </Form.Item>
                            <Form.Item label="Last Name" name='lastName' required rules={true} >
                                <Input id='lastName' type='text'/>
                            </Form.Item>
                            <Form.Item label="Phone no." name='phone' required rules={true} >
                                <Input id='phone' type='text'/>
                            </Form.Item>
                            <Form.Item label="Email" name='email'  required rules={true}>
                                <Input id='email' type='email'/>
                            </Form.Item>
                            <Form.Item label="Website" name='website'>
                                <Input id='website' type='text'/>
                            </Form.Item>
                            <Form.Item label="Address" name='address' required rules={true} >
                                <Input id='address' type='text'/>
                            </Form.Item>
                            </div>
                    </Row>
                
                <h1>Professional Details</h1>
                                  <Row>
                        <div className='doc-form1' layout='vertical'>
                            <Form.Item label="Specialization" name='specialization' required rules={true} >
                                <Input id='specialization' type='text'/>
                            </Form.Item>
                            <Form.Item label="Experience" name='experience' required rules={true}>
                                <Input id='experience' type='text'/>
                            </Form.Item>
                            <Form.Item label="Fees" name='fees' required rules={true}>
                                <Input id='fees' type='text'/>
                            </Form.Item>
                            <Form.Item label="Timings" name='timings' className='time' required rules={true} >
                                <TimePicker.RangePicker format="HH:mm"/>
                            </Form.Item>
                            </div>
                    </Row>
                    <button class="bn632-hover bn22 mine" >Update</button>
                    </Form>
                </div>
                </div>    
            )}
        </Layout>
    )
}
export default Profile;
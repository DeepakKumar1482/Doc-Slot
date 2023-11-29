import  Layout  from '../components/layout.jsx'
import React,{useState} from "react"
import '../styles/ApplyDoctor.css'
import {Form,Row,Input,TimePicker,message}from 'antd'
import{useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice.js'
import axios from 'axios'
function ApplyDoctor(){
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [value,setvalue]=useState();
    
    const handleFinish=async(values)=>{
        console.log(values);   
        try{
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success (res.data.success)
                navigate('/')
            }else{
                dispatch(hideLoading())
                message.error (res.data.error)
            }
        }
        catch(error){
            console.log("This is the actual err=>  ",error);
            message.error('something went wrong');
            dispatch(hideLoading())
        }
    }
    return (
            <Layout >
                <div className='all'>
                <div className='Form'>
                <div className='heading'><h1>Apply Doctor</h1></div>
                    <h1>Personal Details</h1>
                <Form layout='vertical' onFinish={handleFinish} className="parent">                    
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
                    <button class="bn632-hover bn22 mine" >Submit</button>
                    </Form>
                </div>
                </div>   
            </Layout>

    )
}
export default ApplyDoctor
import React from 'react'
import {Form,Input,message}from 'antd'
import '../styles/Register.css'
import {useNavigate,Link}from 'react-router-dom'
import{useDispatch}from 'react-redux'
import {showLoading,hideLoading}from '../redux/features/alertSlice'
import axios from 'axios';
import '../index.css'
const Register = () => {
    const heading={
        fontSize:'30px',
        // fontWeight:'bold'
      }
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const onfinishHandler = async(values) =>{
        try{
            dispatch(showLoading())
            console.log("inside try")
        const res=   await axios.post('/api/v1/user/register', values);
        dispatch(hideLoading())
        if(res.data.success){
            message.success('Registered successfully')
            navigate('/login');
        }else{
            message.error(res.data.message);
        }
        }catch(err){
            console.log(err);
            dispatch(hideLoading())
            message.error("Failed to register");
        }
    }
  return (
    <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='card'>
            <h1 style={heading}>Register</h1>
            <Form.Item label="Name" name="name" style={heading}>
                <Input type='text' required/>
            </Form.Item>
            <Form.Item label="Email" name="email" style={heading}>
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label="Password" name="password" style={heading}>
                <Input type='password' required/>
            </Form.Item>
            {/* <button className='btn btn-primary' type='submit'>Register</button> */}
            <button class="bn632-hover bn26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Register
            </button>
            <Link to='/login' className='link'>Already have an account?</Link>

        </Form>
    </div>
  )
}

export default Register



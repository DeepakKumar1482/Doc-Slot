import React from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import{useDispatch}from 'react-redux'
import{showLoading,hideLoading} from'../redux/features/alertSlice'
import axios from 'axios'
import '../index.css'
const Login = () => {
  const heading={
    fontSize:'30px',
    // fontWeight:'bold'
  }
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onfinishHandler = async(value) => {
    console.log(value);
    try{
      dispatch(showLoading())
    const res=await axios.post('/api/v1/user/login', value);
    dispatch(hideLoading())
    if(res.data.success){
      localStorage.setItem("token",res.data.token);
    message.success("Login successfully")
    navigate('/');
    }
    else{
      message.error(res.data.message)
    }
    }catch(err){
      console.log(err);
      dispatch(hideLoading())
      message.error("Something went wrong")
    }
  }
  return (
    <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='card'>
            <h1 style={heading}>Login</h1>
            <Form.Item label="Email"  name="email" style={heading}>
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label="Password" name="password" style={heading}>
                <Input type='password' required/>
            </Form.Item>
            {/* <button className='btn btn-blue' type='submit'>Login</button> */}
            
            <button class="bn632-hover bn26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Login
            </button>
            <Link to='/register' className='link'>Don't have an account?</Link>
        </Form>
    </div>
  )
}

export default Login
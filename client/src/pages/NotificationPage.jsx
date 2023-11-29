import { useSelector,useDispatch } from 'react-redux';
import Layout from '../components/layout.jsx';
import {Tabs,message}from 'antd'
import '../styles/NotificationPage.css';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import {useNavigate}from 'react-router-dom'
import axios from 'axios';
function NotificationPage(){
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.user)
    const handleMarkAllRead=async() =>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            dispatch(hideLoading())
            if( res.data.success){
                message.success(res.data.message)
            }
            else{ 
                message.error(res.data.message)
            }
        }catch(e){
            dispatch(hideLoading())
            console.log(e);
            message.error("Something went wrong")
        }
    }
    const handleDeleteAllRead=async()=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }catch(e){
            console.log(e);
            message.error("There is an error in deletion of notifications");
        }
    }
    return (
        <Layout >
            <div className='par-1'>
                <div className='ch1'>
                <h1  className='header'>Notifications</h1>
                </div>
                <div className='ch2'>
                <Tabs>
                <Tabs.TabPane tab='Unread' key={0}>
                    <div className='d-flex justiy-content-end' style={{cursor:'pointer'}}>
                        <h1 className='text-primary' onClick={handleMarkAllRead} style={{cursor:'pointer'}}>
                            Mark All Read</h1>
                    </div>
                   {
                    user?.notification.map(notificationMgs=>(                        
                    <div className="card" onClick={()=>navigate(notificationMgs.onClickPath)} style={{cursor:'pointer'}}>
                            <div className="card-text">
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                   }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className='d-flex justiy-content-end'>
                        <h1 className='text-primary' style={{'cursor':'pointer'}} onClick={handleDeleteAllRead}>Mark All Delete</h1>
                    </div>
                    {
                    user?.seennotification.map(notificationMgs=>(                        
                    <div className="card" onClick={()=>navigate(notificationMgs.onClickPath)} style={{cursor:'pointer'}}>
                            <div className="card-text">
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))
                   }
                </Tabs.TabPane>
                </Tabs>
                </div>
                </div>
        </Layout>
        
    )
}
export default NotificationPage;
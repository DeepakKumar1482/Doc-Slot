import '../styles/Home.css';
import {Table}from 'antd'
import {useNavigate}from 'react-router-dom'
function DoctorList({doctor}){
    const startTime=doctor.timings[0];
    const endTime=doctor.timings[1];
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const newstartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newendTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const navigate=useNavigate()
    return(
        <div>
            <div class="courses-container">
	            <div class="course">
		<div class="course-info">
			<h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
            <p className='home-p'>{doctor.experience}  of Experience </p>
            <p className='home-p'>MBBS, MD</p>
			<p className='home-p'>{doctor.specialization}</p>
            <p className='another'>Consultation Fee </p>
            <h1 className='fees'>₹ {doctor.fees}</h1>
			<button class="btn" onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>Book Appointment</button>
		</div>
	</div>
</div>
        </div>
    )
}
export default DoctorList
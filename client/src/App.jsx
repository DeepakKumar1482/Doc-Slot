import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Doctors from './pages/admin/doctors.jsx'
import Users from './pages/admin/users';
import {useSelector}from 'react-redux'
import Spinner from './components/Spinner';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import UserProfile from './pages/UserProfile';

function App() {
    const {loading}=useSelector(state=>state.alerts)
    return ( <>
        <BrowserRouter>
        {loading ? <Spinner />:
        (<Routes>
            <Route path='/apply-doctor'element={
           <ProtectedRoutes>
            {<ApplyDoctor/>}
           </ProtectedRoutes>
           }
            />
             <Route path='/notification'element={
           <ProtectedRoutes>
            {<NotificationPage/>}
           </ProtectedRoutes>
           }
            />
             <Route path='/admin/doctors'element={
           <ProtectedRoutes>
            {<Doctors/>}
           </ProtectedRoutes>
           }
            />
             <Route path='/admin/users'element={
           <ProtectedRoutes>
            {<Users/>}  
           </ProtectedRoutes>
           }
            />
              <Route path='/doctor/profile/:id'element={
           <ProtectedRoutes>
            {<Profile/>}
           </ProtectedRoutes>
           }
            />
              <Route path='/doctor/book-appointment/:doctorId'element={
           <ProtectedRoutes>
            {<BookingPage/>}
           </ProtectedRoutes>
           }
            />
            {/*  */}
            <Route path='/'element={
           <ProtectedRoutes>
            {<Home/>}
           </ProtectedRoutes>
           }
            />
            {/*  */}
            <Route path='/appointment'element={
           <ProtectedRoutes>
            {<Appointments/>}
           </ProtectedRoutes>
           }
            />
            {/*  */}
            <Route path='/profile'element={
           <ProtectedRoutes>
            {<UserProfile/>}
           </ProtectedRoutes>
           }
            /> 


            {/*  */}
            <Route path='/doctor-appointment'element={
           <ProtectedRoutes>
            {<DoctorAppointments/>}
           </ProtectedRoutes>
           }
            />
            {/*  */}
            <Route path='/login' element={
        <PublicRoute>  
         {<Login/>}
        </PublicRoute> }
            />
            <Route path='/register' element={
          <PublicRoute> 
           {<Register/>}
           </PublicRoute>}
            />
        </Routes>)
        }
        
        </BrowserRouter>
    </>
    );
}

export default App;
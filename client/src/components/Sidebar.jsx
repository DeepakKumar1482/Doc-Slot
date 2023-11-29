import '../styles/Sidebar.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { adminMenu, userMenu } from './../Data/data.jsx';
import ApplyDoctor from '../pages/ApplyDoctor';
import { message,Badge ,Avatar} from 'antd';

function Sidebar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initialize the sidebar as open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  const handleLogout = async () => {
    localStorage.clear();
    message.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 check">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
              onClick={toggleSidebar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
>
  {/* <span className="sr-only">Open sidebar</span> */}
  <svg
    className="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
    />
  </svg>
</button>

              <Link to="/" className="flex ml-2 md:mr-24">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3634/3634820.png"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white italic">
                  DOC-SLOT
                </span>
              </Link>
            </div>
            <div className="flex items-center high">
              <div className="flex items-center ml-3 an">
                <i class="fa-solid fa-bell fa-1x w-10 h-7"></i>
              <Badge count={user?.notification.length} className='Bell'>
              </Badge>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Link
                      to="/profile"
                      className="w-8 h-8 rounded-full profile"
                    >
                      {user?.name[0].toUpperCase()}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? '' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 right">
          <ul className="space-y-2 font-medium side">
            <li className="list">
              {SidebarMenu.map((menu) => {
                return (
                  <div className="child">
                    <Link
                      to={menu.path}
                      className="flex items-center p-2 text-gray-900 rounded-lg hovering"
                    >
                      <i class={menu.icon}></i>
                      <span className="ml-3">{menu.name}</span>
                    </Link>
                  </div>
                );
              })}
              <div className="child" onClick={handleLogout}>
                <Link
                  to="/login"
                  className="flex items-center p-2 text-gray-900 rounded-lg hovering"
                >
                  <i class="fa-solid fa-right-from-bracket"></i>
                  <span className="ml-3">Logout</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="page">
        <div className="form"></div>
        
      </div>
    </div>
  );
}

export default Sidebar;

// 
{/* <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button> */}

// 
// import '../styles/Sidebar.css';
// import React,{useState} from 'react';
// import 'flowbite';
// import { useSelector } from 'react-redux';
// import {useLocation,Link,useNavigate} from 'react-router-dom';
// import {adminMenu,userMenu}from './../Data/data.jsx'
// import ApplyDoctor from '../pages/ApplyDoctor';
// import {message}from 'antd'
// function Sidebar(props){

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initialize the sidebar as open

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
//   };
  
//   const navigate=useNavigate();
//   const location=useLocation();
//   const {user}=useSelector(state=>state.user)
//   const SidebarMenu=user?.isAdmin?adminMenu:userMenu;
//  const handlelogout =async()=>{
//  localStorage.clear()
//  message.success("Log successfully")
//   navigate('/login');   
//  }
//     return (     
// <div >
//   <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 check">
//     <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
//       <div className="flex items-center justify-between ">
//         <div className="flex items-center justify-start ">
//            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//              <span className="sr-only">Open sidebar</span>
//              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
//              </svg>
//            </button>
//           <a href="/" className="flex ml-2 md:mr-24">
//              <img src="https://cdn-icons-png.flaticon.com/512/3634/3634820.png" className="h-8 mr-3" alt="FlowBite Logo" />
//              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white italic">DOC-SLOT</span>
//            </a>
//          </div>
//          <div className="flex items-center ">
//          <i class="fa-solid fa-bell w-10 h-3"></i>
//            <div className="flex items-center ml-3 ">
//              <div>
//                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
//                  <span className="sr-only">Open user menu</span>
//                  <Link to='/profile' className='w-8 h-8 rounded-full profile'>{user?.name[0].toUpperCase()}</Link>
//                </button>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    </nav>
//    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 " aria-label="Sidebar">
//      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 right">
//        <ul className="space-y-2 font-medium side">
//          <li className='list'>
//            {SidebarMenu.map((menu)=>{
//             return(
//               <div className='child'>
//               <a href={menu.path} className="flex items-center p-2 text-gray-900 rounded-lg hovering">
//             <i class={menu.icon}></i>
//             <span className="ml-3" >{menu.name}</span>
//           </a>
//               </div>
//             )
//           })}
//           <div className='child' onClick={handlelogout}>
//               <a href="/login" className="flex items-center p-2 text-gray-900 rounded-lg hovering">
//             <i class='fa-solid fa-right-from-bracket'></i>
//             <span className="ml-3" >Logout</span>
//           </a>
//               </div>
//         </li>
//        </ul>
//     </div>
//   </aside>
//   <div className='page'>
//   <div className='form'>
//      {props.com}
//   </div>
//   </div>
//   {/*  */}
//   </div>
//     )
// }
// export default Sidebar;


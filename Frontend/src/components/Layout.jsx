import React from 'react'
import { useSelector } from 'react-redux';
import '../styles/LayoutStyles.css'
import {Badge, message} from 'antd';
import { adminMenu, userMenu } from '../Data/data';
import {Link,useLocation, useNavigate} from 'react-router-dom';
const Layout = ({children}) => {
  const {user}=useSelector(state=>state.user)
  const location=useLocation()
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.clear()
    message.success("Logout Successfully!")
    navigate('/login')
  }
  //****Doctor menu*****//
  const doctorMenu=[
    {
        name: 'Home',
        path:'/',
        icon:"fa-solid fa-house",
    },{
        name:'Appointments',
        path:'/appointments',
        icon:"fa-solid fa-list"
    },
    {
        name: 'Profile',
        path:`/doctor/profile/:${user && user._id}`,
        icon:'fa-solid fa-user',
    },
];
  //rendring menu list
  let SidebarMenu;

if (user && user.isDoctor) {
  SidebarMenu = doctorMenu;
} else if (user && user.isAdmin) {
  SidebarMenu = adminMenu;
} else {
  SidebarMenu = userMenu;
}
  return (
    <div>
        <div className='main'>
           <div className='layout'>
              <div className="sidebar">
                <div className='logo'>
                  <h6 >Hospital App</h6>
                  <hr/>
                </div>
                <div className='menu'>
                  {SidebarMenu.map(menu=>{
                    const isActive=location.pathname===menu.path
                    return(
                      <React.Fragment>
                         <div className={`menu-item ${isActive && 'active'}`}>
                             <i className={menu.icon}></i>
                             <Link to={menu.path}>{menu.name}</Link>
                         </div>
                      </React.Fragment>
                    )
                  })}
                  <div className={`menu-item`} onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <Link to="/login">Logout</Link>
                  </div>
                </div>
              </div>
              <div className='content'>
                <div className='header'>
                  <div className='slogan'>
                    <h6>Always Caring. Always Here!</h6>
                  </div>
                  <div className='header-content' style={{cursor:"pointer"}}>
                    <Badge count={user && user.notification.length}
                     onClick={()=>{
                      navigate("/notification")
                      }}
                     >
                    <i className='fa-solid fa-bell'></i>
                    </Badge>
                    {user && <Link to="/profile">{user.name}</Link>}
                  </div>
                </div>
                <div className='body'>{children}</div>
              </div>
           </div>
        </div>
    </div>
  )
}

export default Layout;

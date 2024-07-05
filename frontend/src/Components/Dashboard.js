import React from 'react'
import './Dashboard.css'
import logo from '../Components/Images/music.png'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const dashnav=useNavigate();
    const usernav=()=>{
       dashnav("/user/login");
    }
    const adminnav=()=>{
        dashnav("/admin/login");
    }
  return (
    <div className='Dashouterdiv'>
    <nav class="navbar" style={{backgroundColor:'#383838'}}>
  <div class="container" style={{marginLeft:'0%'}}>
    <a class="navbar-brand" href="#">
      <img src={logo} alt="Music" style={{width:'8%',height:'8%'}}/>
    </a>
  </div>
</nav>

    
        
    <h2 class="dashh1" style={{textAlign:'center',fontWeight:'bold'}}>Are You a User or Admin ?</h2>
    <div className="DashInnerdiv3">
      <div className='DashInnerdiv1 rounded' onClick={usernav}>
        User
        </div>
      <div className='DashInnerdiv2 rounded' onClick={adminnav}>
        Admin
        </div>
    </div>
    </div>
  )
}

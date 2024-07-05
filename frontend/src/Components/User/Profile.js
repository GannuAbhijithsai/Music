import React,{useState,useEffect} from 'react'
import Navbar from './UserNavbar'
import { Link, useNavigate } from 'react-router-dom';
import edit from '../Images/edit.png'
import './Profile.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Profile() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
    const [user,setuser]=useState([]);
    const [name,setname]=useState("");
    const [gender,setgender]=useState("");
    const handlelocal=()=>{
      localStorage.clear();
    }
    const userfetch=async()=>{
      setload(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${localStorage.getItem('userid')}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-auth-token': `${localStorage.getItem('usertoken')}`,
                }
              });
              const data=await response.json();
              if(response.status===200){
                setuser(data.data);
                console.log(user);
              }else{
                window.confirm(data.message);
              }
        }catch(error){
            console.error('Error fetching users:', error);
        }
        setload(false);
    }
    useEffect(() => {
     userfetch();
    }, [])

    const edituser=async()=>{
      setload(true);
      try{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/update/${localStorage.getItem('userid')}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('usertoken')}`,
            },
            body :JSON.stringify({
              "name":name===""?user.name:name,
              "gender":gender===""?user.gender:gender,
            
     })
          });
          const data=await response.json();
          if(response.status===200){
          alert("Edited Successfully");
          window.location.reload();
          }else{
            alert(data.message);
          }
    }catch(error){
        console.error('Error fetching users:', error);
    }
    setload(false);
    }
    
  return (
    <div className='profilediv1' style={{width:'100vw',height:'100vh',backgroundColor:'black',color:'white',overflowY:'auto'}}>
      <Navbar/>
         
   {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <div className='profilediv2' style={{width:'100%',height:'20%'}}></div>
      <div className='profilediv3'>
        {localStorage.getItem("usergender")==="male"? <div className='profilediv4'></div>:<div className='profilediv5'></div>}
       
        <div className='profilediv6'>
            <h3>{user.name}</h3>
            <p style={{color:'grey'}}>{user.email}</p>
        </div>
      </div>
      <div className='profilediv7'>
        <h6>Name</h6>
      <form class="row g-2">
 
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Name</label>
    <input type="text" onChange={e=>setname(e.target.value)} class="form-control"  placeholder={user.name}/>
  </div>
  <div class="col-auto">
    <button type="button" onClick={edituser} class="btn btn-primary mb-3">Edit</button>
  </div>
</form>
<h6>Gender</h6>
<form class="row g-2">
  
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Gender</label>
    <input type="text" onChange={e=>setgender(e.target.value)} class="form-control"  placeholder={user.gender}/>
  </div>
  <div class="col-auto">
    <button type="button" onClick={edituser} class="btn btn-primary mb-3">Edit</button>
  </div>
</form>

      </div>
   <div className='profilediv8'>
    <p style={{marginBottom:'1%'}}>Want to Change Password ?  <Link to="/changepassword" style={{textDecoration:'None',color:'#f7b731'}}>Click here</Link></p>
    <Link class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handlelocal} style={{textDecoration:'none',fontWeight:'bold',fontSize:'20px'}} to="/">
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
                 
                  </Link>
    </div>

    </div>
  )
}

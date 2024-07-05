import React, { useState } from 'react'
import logo from '../Images/music.png'
import '../Admin/Login.css'
import img1 from '../Images/loginbg.png'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Login() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [userstate,setuserstate]=useState(0);
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const[alt,setalt]=useState(false);
  const [msg,setmsg]=useState("");
  const naviprofile=useNavigate();
  const onsubmit=async()=>{
    setload(true);
    setuserstate(30);
     const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/admin/login`,{
      method:'POST',
      headers:{
         'Content-Type':'application/json',
      },
      body :JSON.stringify({
               "email":email,
               "password":password
      })
     })
  //   const data=await response.json();
  setuserstate(50);
  const datas=await response.json();
  console.log(datas);
  setmsg(datas.message);
 if(response.status==200){
     setalt(false);
   
   localStorage.setItem("email",`${email}`)
   localStorage.setItem("token",`${datas.data}`)
   setalt(false);
   setuserstate(100);
   naviprofile(`/admin/home`, { state:{} });
 }else{
   setuserstate(100);
     setalt(true);
 }
 setload(false);
 }
  return (
    <>
    
    
    <div className='Adminlogindiv1'>
      
    {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
         <div className='Adminlogindiv2'>
            <img class="logoimg" src={logo} style={{}}></img>
            <p style={{textAlign:'center',fontSize:'24px',fontWeight:'bold',color:'#f7b731'}}>Login</p>
            {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}
            <form style={{width:'80%'}}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label" style={{color:'#f7b731'}}>Email address</label>
    <input type="email" style={{color:'white'}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setemail(e.target.value)}/>
    <div id="emailHelp" class="form-text" style={{color:'#f7b731'}}>We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label"style={{color:'#f7b731'}}>Password</label>
    <input type="password" style={{color:'white'}} class="form-control" id="exampleInputPassword1" onChange={e=>setpassword(e.target.value)}/>
  </div>

  <button type="button" disabled={password==="" || email==="" ?true:false} style={{color:'#f7b731'}} onClick={onsubmit} class="btn btn-dark">Submit</button>
</form>
         </div>
    </div>
    </>
  )
}

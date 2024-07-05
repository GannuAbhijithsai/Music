import React, { useState } from 'react'
import img from '../Images/ms1.jpg'
import img1 from '../Images/userlogin2.jpg'
import img2 from '../Images/userlogin5.jpg'
import logo from '../Images/music.png'
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Loginuser.css'
import { useNavigate } from 'react-router-dom'
export default function Loginuser() {
  const [sign,setsign]=useState(false);
  const [signcolor,setsigncolor]=useState('black');
  const [logincolor,setlogincolor]=useState('white');
  const [login,setlogin]=useState(true);
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [dob,setdob]=useState();
  const [date,setdate]=useState("");
  const [month,setmonth]=useState("");
  const [year,setyear]=useState("");
  const [gender,setgender]=useState("male");
  const[alt,setalt]=useState(false);
  const [msg,setmsg]=useState("");
  const [altlogin,setaltlogin]=useState(false);
  const [loginmsg,setloginmsg]=useState("");
  const [load,setload]=useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const signupform=()=>{
    
    setlogin(false);
    setlogincolor('black');
    setsign(true);
    setsigncolor('white');
  
  }
  const loginform=()=>{
    setsign(false);
    setsigncolor('black');
    setlogin(true);
    setlogincolor('white');
    
  }
  const dateset=(e)=>{
    var vals = e.target.value.split('-');
    setyear(vals[0]);
     setmonth(vals[1]);
     setdate(vals[2]);
   
  }
  const signupsubmit=async()=>{
    setload(true);
    console.log(gender);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body :JSON.stringify({
          "name":name,
          "email":email,
          "password":password,
          "year":year,
          "month":month,
          "date":date,
          "gender":gender,
 })
      });
      const data = await response.json();
     if(response.status!==200){
               setalt(true);
               setmsg(data.message);
     }else{
      alert("Account has been created successfully");
      setsigncolor('black');
      setsign(false);
      setlogincolor('white');
      setlogin(true);
     }
    } catch (error) {
      setalt(true);
      setmsg(error);
      console.error('Error fetching users:', error);
  
    }
    setload(false);
  }
  const loginnav=useNavigate();
  const loginsubmit=async()=>{
    setload(true);
    console.log(email,password);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body :JSON.stringify({
          "email":email,
          "password":password,
        
 })
      });
      const data = await response.json();
      console.log(response.status);
     if(response.status!==200){
      console.log("hi");
               setaltlogin(true);
               setloginmsg(data.message);
               console.log(altlogin);
               console.log(loginmsg);
     }else{
      alert("You have successfully logged in");
      localStorage.setItem("usertoken",data.data);
      localStorage.setItem("userid",data.id);
      localStorage.setItem("usergender",data.gender)
      loginnav("/home")
     }
    } catch (error) {
      setaltlogin(true);
      setloginmsg(error);
      console.error('Error fetching users:', error);
  
    }
    setload(false);
  }
  const classes=useStyles();
  return (
    <div className='Loginuserdiv1' style={{overflowY:'hidden'}}>
     {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <div className='Loginuserdiv3' style={{marginTop:'2%'}}>
      <img class='logoimg' src={logo} style={{}}></img>
        <div style={{width:'100%',height:'5%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'1%'}}>
          
      <button  onClick={signupform}style={{width:'30%',height:'100%',backgroundColor:'transparent',color:'#f7b731',borderStyle:'solid',borderColor:'black',borderBottomColor:signcolor}}>Signup</button>
      <button onClick={loginform} style={{width:'30%',height:'100%',backgroundColor:'transparent',color:'#f7b731',borderStyle:'solid',borderColor:'black',borderBottomColor:logincolor}}>Login</button>
        </div>
        <div style={{width:'100%',height:'85%',display:'flex',flexDirection:'column',justifyContent:'baseline',alignItems:'center',marginTop:'5%'}} >
       {sign && <form style={{width:'80%'}}>
       {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
   
  </div>:""}
        <div style={{width:'100%'}}>
       
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input onChange={e=>setname(e.target.value)} style={{color:'white'}}  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div style={{display:'flex',justifyContent:'space-between'}}>
  <div className='mb-3' style={{width:'45%'}} >
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input onChange={e=>setemail(e.target.value)} style={{color:'white'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className='mb-3' style={{width:'45%'}}>
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input onChange={e=>setpassword(e.target.value)} style={{color:'white'}}  type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  </div>
  <div  style={{display:'flex',justifyContent:'space-between'}}>
    <div className='mb-3' style={{width:'45%'}}>
    <label for="exampleInputEmail1" class="form-label">Date of Birth</label>
    <input onChange={e=>dateset(e)} type="date" style={{color:'white'}}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
    </div>
    <div className='mb-3' style={{width:'45%'}}>
    <label for="exampleInputEmail1" class="form-label">Gender</label>
   
  <select  onChange={e=>setgender(e.target.value)} style={{color:'white'}}  class="form-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Others</option>
  </select>

  </div>
  </div>
  
  <button type="button" style={{color:'#f7b731'}} onClick={signupsubmit} class="btn btn-dark">Submit</button>
</form> }
{login && <form style={{width:'80%'}}>
{altlogin===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{loginmsg}</strong>
   
  </div>:""}
  <div className='mb-3' >
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input onChange={e=>setemail(e.target.value)} style={{color:'white'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className='mb-3' >
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input onChange={e=>setpassword(e.target.value)} style={{color:'white'}} type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  
 
  <div style={{display:'flex',flexDirection:'column'}}>
  <button type="button" onClick={loginsubmit} style={{color:'#f7b731'}} class="btn btn-dark">Submit</button>
  <Link to="/forgotpassword" style={{marginTop:'3%',color:"grey"}}>Forgot Password ?</Link>
  </div>
</form> }
        </div>
      </div>
     
    </div>
  )
}

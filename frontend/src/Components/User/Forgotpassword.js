import React,{useState} from 'react'
import './Forgotpassword.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/music.png'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Forgotpassword() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const forgo=useNavigate();
  const [email,setemail]=useState("");
 const [alt,setalt]=useState(false);
 const [msg,setmsg]=useState("");
 const forgfetch=async()=>{
 setload(true);
    try{
        const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/forgot`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
                
            },
            body:JSON.stringify({
                "email":email,
            })
        });
        const data=await response.json();
        console.log(data);
        if(response.status===200){
            alert("OTP has been Sent to Your email");
            localStorage.setItem('forgetemail',email);
            forgo("/verifyotp");
        }else{
            setalt(true);
            setmsg(data.message);
        }
    }catch(error){
        console.error(error);
    }
    setload(false);
 }
  return (
    <div className='forgdiv1' style={{width:'100vw',height:'100vh'}}>
         {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <form  class='forgdiv2'style={{marginTop:'10%',marginRight:'10%'}}>
{alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
   
  </div>:""}
  <img src={logo} class='logoimg' style={{marginLeft:'40%'}}></img>
  <p style={{color:'grey',textAlign:'center'}}>Enter your email here and we'll send you a OTP to your email to get back into your account</p>
  <div className='mb-3' >
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input onChange={e=>setemail(e.target.value)} style={{color:'white'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
 
 
  <div style={{display:'flex',flexDirection:'column'}}>
  <button type="button"  style={{color:'#f7b731'}} onClick={forgfetch} class="btn btn-dark">Submit</button>
  <Link to="/user/login" style={{marginTop:'3%',color:"grey",textAlign:'center'}}>Return to Login </Link>
  </div>
</form>
    </div>
  )
}

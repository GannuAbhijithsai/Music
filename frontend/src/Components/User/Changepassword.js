import React,{useState} from 'react'
import './Otpverify.css'
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import './Changepassword.css'
import logo from '../Images/music.png'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Changepassword() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [password,setpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");
  const [alt,setalt]=useState(false);
  const [msg,setmsg]=useState("");
  const [otp, setOtp] = useState('');
  const forgo=useNavigate();
 const changefetch=async()=>{
  setload(true);
  if(password!==confirmpassword){
    setalt(true);
    setmsg("set password and confirm password should be same");
  }
  try{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/changepassword`,{
          method:'POST',
          headers:{
              'content-Type':'application/json',
              'x-auth-token':localStorage.getItem('usertoken'),
          },
          body:JSON.stringify({
              "email": localStorage.getItem('forgetemail'),
              "password":password,
          })
      });
      const data=await response.json();
      console.log(data);
      if(response.status===200){
          alert("Password Changed  successfully");
         localStorage.removeItem('forgetemail');
          forgo("/user/login");
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
    <div className='changepassdiv1'>
       {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
       <form class="changepdiv2" style={{marginTop:'5%',marginRight:'10%'}}>
{alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
   
  </div>:""}
  <img className='logoimg' src={logo} style={{marginLeft:'40%'}}></img>
  <p style={{color:'grey',textAlign:'center'}}>Your Password Must contain atleat 6 characters and should include a combination of numbers,letters and special characters (!$@%)</p>
 
 <div className='mb-3'>
    <label for="exampleInputEmail1" class="form-label">Set Password</label>
    <input onChange={e=>setpassword(e.target.value)} style={{color:'white'}} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div className='mb-3'>
    <label for="exampleInputEmail1" class="form-label">Confirm Password</label>
    <input onChange={e=>setconfirmpassword(e.target.value)} style={{color:'white'}} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
 
  <div style={{display:'flex',flexDirection:'column'}}>
  <button type="button"   style={{color:'#f7b731'}} disabled={password===''||confirmpassword===''} onClick={changefetch} class="btn btn-dark">Submit</button>
  <Link to="/user/login" style={{marginTop:'3%',color:"grey",textAlign:'center'}}>Return to Login </Link>
  </div>
</form>
    </div>
  )
}

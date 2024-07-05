import React,{useState} from 'react'
import './Otpverify.css'
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import logo from '../Images/music.png'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Otpverify() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
    const [email,setemail]=useState("");
 const [alt,setalt]=useState(false);
 const [msg,setmsg]=useState("");
 const [otp, setOtp] = useState('');
 const forgo=useNavigate();
 const otpfetch=async()=>{
  setload(true);
  try{
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/otpverify`,{
          method:'POST',
          headers:{
              'content-Type':'application/json',
              'x-auth-token':localStorage.getItem('usertoken'),
          },
          body:JSON.stringify({
              "email": localStorage.getItem('forgetemail'),
              "otp":otp,
          })
      });
      const data=await response.json();
      console.log(data);
      if(response.status===200){
          alert("OTP has been verified successfully");
         
          forgo("/changepassword");
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
    <div className="otpverifydiv1">
        {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
    <form class="otpvdiv2" style={{marginRight:'10%'}}>
{alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
   
  </div>:""}
  <img class='logoimg' src={logo} style={{marginLeft:'40%'}}></img>
  <p style={{color:'grey',textAlign:'center'}}>Enter the 6 digit code that we sent to our registered email</p>
  <div className='mb-3' style={{alignContent:'center'}}>
   
  
  <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span> &nbsp; &nbsp;</span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{
        width: '20%',
        marginBottom: "10px",
        height: '20%',
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        backgroundColor: "transparent",
        color:'white',
        outline: "none",
      }}
    />
 </div>
  <div style={{display:'flex',flexDirection:'column'}}>
  <button type="button" onClick={otpfetch}  style={{color:'#f7b731'}}  class="btn btn-dark">Submit</button>
  <Link to="/user/login"  style={{marginTop:'3%',color:"grey",textAlign:'center'}}>Return to Login </Link>
  </div>
</form>
    </div>
  )
}

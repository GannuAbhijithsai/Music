import React, { useState } from 'react'
import './Contactus.css'
import Navbar from './UserNavbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Contactus() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [phonenumber,setphonenummber]=useState("");
  const [message,setmessage]=useState("");
const sendmessage=async()=>{
  setload(true);
  const today = new Date();
  const month = (today.getMonth() + 1).toString()
  const year = today.getFullYear().toString();
  const date = today.getDate().toString();
  const time = new Date().toLocaleTimeString().toString();


  console.log(month,year,date,time);
try{
       const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/contact`,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('usertoken')}`,
        },
        body:JSON.stringify({
       "name":name,
          "email":email,
          "phonenumber":phonenumber,
          "message":message,
          "year":year,
          "month":month,
          "date":date,
          "time":time,
        /*     "name":"Abhijith",
  "email":"saigannu08@gmail.com",
  "phonenumber":"8008407030",
  "message":"hi",
  "year":"2024",
  "month":"06",
  "date":"14",
  "time":"17:48"*/
        })
       });
       const data=response.json();
       if(response.status===200){
        alert("Message has been sent");
        window.location.reload();
       }else{
        alert(data.message);
       }
}catch(error){
  console.error(error);
}
setload(false);
}
     const googlemaps =
    'https://www.google.co.in/maps/place/Sri+sai+Electricals/@18.8569543,79.7929832,17z/data=!3m1!4b1!4m6!3m5!1s0x3a32ebfc74b8b511:0x8415a0f7bd73635b!8m2!3d18.8569543!4d79.7955581!16s%2Fg%2F11jclsk029?entry=ttu'
  return (
    <div className='contactdiv1' style={{overflowY:'auto'}} >
      <Navbar/>
      {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <h1 style={{textAlign:'center',fontWeight:'bold',marginTop:'3%',color:'#6CC1B6'}}>Contact Us</h1>
      <p style={{textAlign:'center',marginTop:'1%',color:'grey'}}>Got questions or feedback? We're all ears! Reach out to us anytime through the form below and we'll get back to you pronto.</p>
      <div class="innerdiv1" >
       
          <form class="contactusform">
            <input type="text" onChange={e=>setname(e.target.value)} placeholder="Enter your Name" class="contactusinput" />
            <input type="email" onChange={e=>setemail(e.target.value)} placeholder="Enter your Email" class="contactusinput" />
            <input type="text" onChange={e=>setphonenummber(e.target.value)} placeholder="Enter your Phone Number" class="contactusinput" />
            <textarea class="contactusinput" onChange={e=>setmessage(e.target.value)}  placeholder="Type your Message here"  rows="5"></textarea>
            <button class="contactusbutt" type="button" onClick={sendmessage}>Send Message &rarr;</button>
          </form>
       
      </div>
    </div>
  )
}

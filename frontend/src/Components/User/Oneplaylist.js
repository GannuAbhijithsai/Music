import React, { useState,useEffect } from 'react'
import Navbar from './UserNavbar'
import './Oneplaylist.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Oneplaylist() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
    const [playlist,setplaylist]=useState([]);
    const [songs,setsongs]=useState([]);
    useEffect(() => {
        playfetch();
       }, [])
    const playfetch=async()=>{
      setload(true);
        try{
        const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/get/${localStorage.getItem("oneplayid")}`,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('usertoken')}`,
            },
        });
        const data=await response.json();
        if(response.status===200){
            console.log(data.data);
      setplaylist(data.data.playlist);
      setsongs(data.data.playlist.songs);
      //
      //
    
        console.log(playlist);
        }else{
            alert(data.message);
        }

    }catch(error){
        console.error(error);
    }
    setload(false);
}
const [allsongs,setallsongs]=useState([]);
const songsfetch=async()=>{
    try{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/songs/allsongs`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data.data);
       if(response.status===200){
        const all = data.data;
        const filteredSongs = all.filter((song) => songs.includes(song._id));
        setallsongs(filteredSongs);
       }else{
        console.log("error");
       }
    
      } catch(error){
        console.error('Error fetching users:', error);
      
      }
};
useEffect(() => {
  if (songs.length > 0) {
    songsfetch();
  }
},[songs])

const removesong=async(e)=>{
  setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/remove-song`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('usertoken')}`,
          },
          body :JSON.stringify({
            "playlistId":localStorage.getItem("oneplayid"),
            "songId":e,
          
   })
        });
        const data=await response.json();
        if(response.status===200){
        alert("Song removed from Playlist Successfully");
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
   <>
      <Navbar/>
      {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <div class='oneplaydiv1' style={{width:'100vw',height:'100vh',color:'azure',backgroundColor:'black',overflowY:'auto'}}>
      <div  className="Oneplay1" style={{overflowY:'auto'}}>
        <img className='onepimg2' src={playlist.img} style={{}}></img>
        <h3 style={{fontWeight:'bold',marginTop:'5%',textAlign:'center'}}>{playlist.name}</h3>
        <p style={{color:'grey'}}>{playlist.desc}</p>
      </div>
     <div class='Oneplay2' style={{overflowY:'auto'}}>
     {allsongs.map((element, index) => (
        <div class='Oneplay3' style={{}}>
          <div class='Oneplay7'>
                   <img className='Oneplay4' src={element.img} style={{}}></img>
              
                   <div className='Oneplay5' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <h5 style={{marginBottom:'1%'}}>{element.name}</h5>
                    <p style={{color:'grey',marginBottom:'0%'}}>{element.artist}</p>
                   </div>
                
                    </div>
                    <div class='Oneplay8'>
                   <audio controls className='Oneplay6' style={{}}>
                                <source src={element.song} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <div style={{width:'10%'}}>
                            <button type="button" onClick={()=>removesong(element)} class="btn btn-outline-danger">Remove</button>
                           
                            </div>
        </div>
        </div>
     ))}
     </div>
    </div>
    </>
  )
}

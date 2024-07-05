import React, { useState,useEffect } from 'react'
import logo from '../Images/music.png';
import { Link, useNavigate } from 'react-router-dom';
import {Multiselect} from 'multiselect-react-dropdown';
import './AdminUpdateplaylist.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function AdminUpdateplaylist() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [playlist,setplaylist]=useState([]);
    const [songs,setsongs]=useState([]);
    useEffect(() => {
        playfetch();
       }, [])
    const playfetch=async()=>{
      setload(true);
        try{
        const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/playlist/get/${localStorage.getItem("updateplaylistid")}`,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('token')}`,
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
        setallsongs(data.data);
       }else{
        console.log("error");
       }
    
      } catch(error){
        console.error('Error fetching users:', error);
      
      }
};
useEffect(() => {
 songsfetch();
},[])
function getnameById(id) {
    const song = allsongs.find(song => song._id === id);
    return song ? song.name : null; // Return duration if found, otherwise null
}
function getartistById(id) {
    const song = allsongs.find(song => song._id === id);
    return song ? song.artist : null; // Return duration if found, otherwise null
}
function getimgById(id) {
    const song = allsongs.find(song => song._id === id);
    return song ? song.img : null; // Return duration if found, otherwise null
}
const getSongById = (id) => {
    const song = allsongs.find(song => song._id === id);
    return song ? song.song : null;
};
const removesong=async(e)=>{
  setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/playlist/remove-song`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('token')}`,
          },
          body :JSON.stringify({
            "playlistId":localStorage.getItem("updateplaylistid"),
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

  const addasong=async()=>{
    setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/playlist/add-song`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('token')}`,
          },
          body :JSON.stringify({
            "playlistId":localStorage.getItem("updateplaylistid"),
            "songs":selectedSongs,
          
   })
        });
        const data=await response.json();
        if(response.status===200){
        alert("Songs added to Playlist Successfully");
        window.location.reload();
        }else{
          alert(data.message);
        }
  }catch(error){
      console.error('Error fetching users:', error);
  }
  setload(false);
  }

  const lognav=useNavigate();
  const logoutfetch=()=>{
   let ans=window.confirm("Are you want to logout ?");
   if(ans===true){
  
    lognav("/");
   localStorage.clear();
   }
  }
  
  return (
   <>
    {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
     <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <img src={logo} alt="Music" style={{ width: '4%', height: '4%' }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Offcanvas Navbar */}
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Music</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/admin/home">Home</Link>
                </li>
               
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/songupload">Upload Song</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/playlistupload">Upload Playlist</Link>
                </li>
                {/* Dropdown Menu */}
            
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/allsongs">Songs</Link>
                </li>
                <li className="nav-item">
                <button type="button" onClick={logoutfetch} class="btn btn-outline-danger">Logout</button>
                
                </li>
              </ul>
              {/* Search Form */}
            
            </div>
          </div>
        </div>
      </nav>
    <div className='updateplaydiv1' style={{width:'100vw',height:'100vh',marginTop:'5%',color:'azure',backgroundColor:'black',overflowY:'auto'}}>
  
    <div  className="updateplay1" style={{overflowY:'auto'}}>
      <img src={playlist.img} style={{width:'100%',height:'40%'}}></img>
      <h3 style={{fontWeight:'bold',marginTop:'5%',textAlign:'center'}}>{playlist.name}</h3>
      <p style={{color:'grey'}}>{playlist.desc}</p>
      <h3 style={{fontWeight:'bold'}}>Add a song</h3>
      <div class="mb-3"style={{width:'70%',color:'black'}}>
      <Multiselect
options={allsongs} // Options to display in the dropdown
selectedValues={allsongs.selectedValue} // Preselected value to persist in dropdown
 // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
onSelect={(selectedList) => {
  const selectedIds = selectedList.map((song) => song._id);
  setSelectedSongs(selectedIds);
}}
onRemove={(selectedList) => {
  const selectedIds = selectedList.map((song) => song._id);
  setSelectedSongs(selectedIds);
}}
/>
<button type="button" onClick={addasong} style={{marginTop:'5%'}}  class="btn btn-outline-success">Add</button>
</div>
    </div>
   <div className='updateplay2' style={{overflowY:'auto'}}>
   {songs.map((element, index) => (
      <div className='updateplay3' style={{}}>
        <div className='updateplay7'>
                 <img className='updateplay4' src={getimgById(element)} ></img>
            
                 <div className='updateplay5' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  <h5 style={{marginBottom:'1%'}}>{getnameById(element)}</h5>
                  <p style={{color:'grey',marginBottom:'0%'}}>{getartistById(element)}</p>
                 </div>
                 </div>
                 <div className='updateplay8'>
                 <audio className='updateplay6' controls >
                              <source src={getSongById(element)} type="audio/mpeg" />
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

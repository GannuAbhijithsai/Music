import Navbar from './UserNavbar'
import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Myplaylist.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Myplaylist() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [songs,setsongs]=useState([]);
  const [searched,setsearched]=useState("");
  const [searchsongs,setsearchsongs]=useState([]);
  const [liked,setliked]=useState([]);
  const [alt,setalt]=useState(false);
  const [moreid,setmoreid]=useState("");
  const songsfetch=async()=>{
    setload(true);
      try{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/all`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('usertoken')}`,
            }
          });
          const data = await response.json();
          console.log(data);
         if(response.status===200){
          const filteredSongs = data.data.filter(song => song.user===localStorage.getItem('userid'));
      setsongs(filteredSongs);
      console.log(filteredSongs,songs);
         }else{
          console.log("error");
         }
      
        } catch(error){
          console.error('Error fetching users:', error);
        
        }
        setload(false);
  };
  useEffect(() => {
   songsfetch();
  },[])

 

  const lognav=useNavigate();
const logoutfetch=()=>{
let ans=window.confirm("Are you want to logout ?");
if(ans===true){

 lognav("/");
localStorage.clear();
}
}
 
 


  const searchfetch=async(e)=>{
    setload(true);
    console.log(e);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/my/?search=${e}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('usertoken')}`,
        }
      });
      const data = await response.json();
     if(response.status===200){
      console.log(data.data)
      const filteredSongs = data.data.playlists.filter(song => song.user===localStorage.getItem('userid'));
      setsearchsongs(filteredSongs);
     // setsearchsongs(data.data.playlists);
      setalt(true)
     }else{
      alert(data.message);
     }
  
    } catch(error){
     alert("Internal error");
    
    }
    setload(false);
  }
  const closesearch=()=>{
    setalt(false);
  }
  const myplay=useNavigate();
  const playgoto=(e)=>{
    console.log(e);
    localStorage.setItem("oneplayid",e);
    myplay("/oneplaylist")
  }
  const delplay=async(id)=>{
    setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('usertoken')}`,
        }
      });
      const data = await response.json();
     if(response.status===200){
          alert("Playlist has been deleted");
          window.location.reload(); 
     }else{
      alert(data.message);
     }
    }catch(error){
      console.error(error);
    }
    setload(false);
  }
  const editplay=(id)=>{
    localStorage.setItem("editmyplayid",id);
      myplay("/editplaylist")
  }
  const handlecli=(id)=>{
    setmoreid(id)
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
    
  return (
    <div className='myplaylistdiv1' style={{width:'100vw',height:'100vh',backgroundColor:'black',color:'white',overflowY:'auto'}}>
       {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <Navbar/>
      <form className="d-flex mt-3" role="search" style={{width:'70%',marginLeft:'15%',marginBottom:'5%'}}>
                <input className="form-control me-2" style={{color:'white'}} onChange={e=>setsearched(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" onClick={()=>searchfetch(searched)} type="button">Search</button>
              </form>
              {alt &&<div style={{height:'100%'}}>  <button type="button" className="btn-close"  style={{color:'white',backgroundColor:'white'}} onClick={closesearch} ></button>
              <Carousel responsive={responsive}>
              {searchsongs.map((element, index) => (
        <>
       { element.user===localStorage.getItem("userid")?
           <div class="card"  style={{width: '93%',borderStyle:'hidden',height:'55%',marginRight:'1%',cursor:'pointer',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey'}}>
           <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'50%'}}/>
           <div class="card-body">
             <h3 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h3>
             <p style={{color:'grey'}}>{element.desc.substring(20,0)}....</p>
          <p>Number of Songs:{element.songs.length}</p>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
          <button type="button"  onClick={()=>playgoto(element._id)} class="btn btn-outline-success" style={{marginRight:'5%'}}>View</button>
       
<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>handlecli(element._id)}  width="26" height="36" fill="currentColor" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg>
</div>



           </div>
         </div>:null}
         </>
        
      ))}
      </Carousel >
       <hr style={{height:'1px',borderTop:' 7px solid white'}}></hr>
       </div>

      
    }
      <Carousel responsive={responsive}>
      {songs.map((element, index) => (
        <>
       { element.user===localStorage.getItem("userid")?
           <div class="card"  style={{width: '93%',borderStyle:'hidden',height:'55%',marginRight:'1%',cursor:'pointer',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey'}}>
           <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'50%'}}/>
           <div class="card-body">
             <h3 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h3>
             <p style={{color:'grey'}}>{element.desc.substring(20,0)}....</p>
          <p>Number of Songs:{element.songs.length}</p>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
          <button type="button"  onClick={()=>playgoto(element._id)} class="btn btn-outline-success" style={{marginRight:'5%'}}>View</button>
       
<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>handlecli(element._id)}  width="26" height="36" fill="currentColor" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
</svg>
</div>



           </div>
         </div>:null}
         </>
        
      ))}
     </Carousel>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Settings</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
      
      <button type="button" onClick={()=>editplay(moreid)} style={{marginBottom:'5%'}} class="btn btn-outline-info">Edit Playlist</button>
      <button type="button" onClick={()=>delplay(moreid)} class="btn btn-outline-danger">Delete Playlist</button>
   
   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

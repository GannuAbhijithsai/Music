import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './UserNavbar'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Favourite.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Favourite() {
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
  const [myplaylist,setmyplaylist]=useState([]);
  const [alt,setalt]=useState(false);
  const [selectedSong, setSelectedSong] = useState(null); 
  const songsfetch=async()=>{
    setload(true);
      try{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/songs/liked`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('usertoken')}`,
            }
          });
          const data = await response.json();
          console.log(data.data);
         if(response.status===200){
          setsongs(data.data);
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
  const myplaylistfetch=async()=>{
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
        console.log(data.data);
       if(response.status===200){
        setmyplaylist(data.data);
       }else{
        console.log("error");
       }
    
      } catch(error){
        console.error('Error fetching users:', error);
      
      }
  };
  useEffect(() => {
  myplaylistfetch();
  },[])
  const favfetch=async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/songs/liked`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('usertoken')}`,
        }
      });
      const data = await response.json();
    
     if(response.status===200){
      const songs=data.data;
      const songIds = songs.map(({ _id }) => _id);
       setliked(songIds);
     }else{
      console.log("error");
     }
  
    } catch(error){
      console.error('Error fetching users:', error);
    
    }
  };
  useEffect(() => {
  favfetch();
  
  },[])
  
const favsav=async(e)=>{
  setload(true);
  try{
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/songs/like/${e}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('usertoken')}`,
      }
    });
    const data = await response.json();
  
   if(response.status===200){
    alert(data.message);
    window.location.reload();
   }else{
    console.log("error");
   }

  } catch(error){
    console.error('Error fetching users:', error);
  
  }
  setload(false);
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
const addToPlaylist = async (playlistId) => {
  setload(true);
  try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/add-song`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('usertoken')}`,
          },
          body: JSON.stringify({ 
            "playlistId":playlistId,
            "songId": selectedSong 
          })
      });
      const data = await response.json();
      if (response.status === 200) {
          alert(data.message);
          
      }else if(response.status===407){
        alert(data.message);
      } else {
          console.log("error");
      }
  } catch (error) {
      console.error('Error adding song to playlist:', error);
  }
  setload(false);
};
const openAddModal = (songId) => {
  setSelectedSong(songId);
  
};

  
  
  return (
    <div className='Favdiv1' style={{width:'100vw',height:'100vh',backgroundColor:'black',color:'azure',overflowY:'auto'}}>
               
   {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <Navbar/>
      <div style={{width:'100%',height:'100%',marginTop:'5%'}}>
        <h1 style={{textAlign:'center',marginBottom:'5%'}}>Favourite Songs</h1>
        <Carousel responsive={responsive}>
      {songs.map((element, index) => (
        
           <div class="card" style={{width: '93%',borderStyle:'hidden',height:'77%',marginRight:'1%',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey'}}>
           <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'47%'}}/>
           <div className='card-body'  style={{height:'60%'}}>
             <h3 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h3>
             <p style={{color:'grey'}}>{element.artist}</p>
             <audio controls style={{width:'100%'}}>
                                <source src={element.song} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <div style={{cursor:'pointer'}} onClick={()=>favsav(element._id)}>
                            <svg
     xmlns="http://www.w3.org/2000/svg"
     fill={liked.includes(element._id)===true?'red':'white'}
     stroke='black'
     strokeWidth="2"
     viewBox="0 0 24 24"
     width="40"
     height="48"
     style={{cursor:'pointer'}}
   >
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.17l-1.41-1.41C5.61 15.9 2 12.25 2 8.5c0-2.5 2-4.5 4.5-4.5C9.64 4 11.07 5.11 12 6.64 12.93 5.1 14.36 4 16.5 4c2.5 0 4.5 2 4.5 4.5 0 3.75-3.61 7.4-8.59 11.26L12 21.17z" />
   </svg>
   </div>
  
  
<button type="button" class="btn btn-outline-success" onClick={()=>openAddModal(element._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Add to Playlist
</button>



  



           </div>
         </div>
        
      ))}
     
     </Carousel>
        
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add to Playlist</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
             <ul className="playlist-list">
                 {myplaylist.map(playlist => (
                  <>
                  {playlist.user===localStorage.getItem("userid")?
                     <li key={playlist._id} onClick={() => addToPlaylist(playlist._id)}>
                         {playlist.name}
                     </li>:""}
                     </>
                 ))}
             </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

import React,{useEffect, useState} from 'react'
import logo from '../Images/music.png';
import { Link, useNavigate } from 'react-router-dom';
import './Adminsongs.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Adminsongs() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
    const [songs,setsongs]=useState([]);
    const [playlist,setplaylist]=useState([]);
    const [searched,setsearched]=useState("");
    const [searchsongs,setsearchsongs]=useState([]);
    const [alt,setalt]=useState(false);
    const songsfetch=async()=>{
      setload(true);
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

    const playlistfetch=async()=>{
     
      try{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/playlist/all`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token'),
            }
          });
          const data = await response.json();
          console.log(data.data);
         if(response.status===200){
          setplaylist(data.data);
         }else{
          console.log("error");
         }
      
        } catch(error){
          console.error('Error fetching users:', error);
        
        }
  };
  useEffect(() => {
   playlistfetch();
  },[])



    const lognav=useNavigate();
 const logoutfetch=()=>{
  let ans=window.confirm("Are you want to logout ?");
  if(ans===true){
 
   lognav("/");
  localStorage.clear();
  }
 }
   
    const deletesong=async(id)=>{
      setload(true);
      let text="Are you want to delete this song";
      let ans=window.confirm("Are you want to delete this song");
      if(ans===true){
        try{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/songs/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('token')}`,
            }
          });
          const data = await response.json();
         if(response.status===200){
        
         alert("Song was Deleted Successfully")
         }else{
          alert(data.message);
         }
      
        } catch(error){
         alert("Internal error");
        
        }
        window.location.reload();
        
      }
      
      setload(false);
    };
    const deleteplay=async(id)=>{
      setload(true);
      let text="Are you want to delete this playlist";
      let ans=window.confirm("Are you want to delete this Playlist");
      if(ans===true){
        try{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/playlist/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('token')}`,
            }
          });
          const data = await response.json();
         if(response.status===200){
        
         alert("Playlist was Deleted Successfully")
         }else{
          alert(data.message);
         }
      
        } catch(error){
         alert("Internal error");
        
        }
        window.location.reload();
        
      }
      setload(false);
    
    };
    const updatenav=useNavigate();
    const updatesong=(id,name,artist,song,image,duration)=>{
      localStorage.setItem("updatesongid",id);
      localStorage.setItem("updatesongname",name);
      localStorage.setItem("updatesongartist",artist);
      localStorage.setItem("updatesongsong",song);
      localStorage.setItem("updatesongimage",image);
      localStorage.setItem("updatesongduration",duration);

      updatenav("/admin/updatesong");

    }
    const updateplaynav=useNavigate();
    const updateplay=(id)=>{
      localStorage.setItem("updateplaylistid",id);

      updateplaynav("/admin/updateplaylist");

    }

    const searchfetch=async(e)=>{
      setload(true);
      console.log(e);
      try{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/?search=${e}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
       if(response.status===200){
        console.log(data.data)
        setsearchsongs(data.data.songs);
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
                  <Link className="nav-link " to="/admin/allsongs">Songs</Link>
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
   
    <div className='Adminsongsdiv1' style={{overflowY:'auto'}}>
        
       
     <div style={{width:'100%',height:'100%',marginTop:'15%'}}>
     
      <form className="d-flex mt-3" role="search" style={{width:'80%',marginLeft:'10%',marginBottom:'5%'}}>
                <input className="form-control me-2" onChange={e=>setsearched(e.target.value)} type="search" placeholder="Search" style={{color:'white'}} aria-label="Search" />
                <button className="btn btn-success" onClick={()=>searchfetch(searched)} type="button">Search</button>
              </form>
              {alt &&<div>  <button type="button" className="btn-close"  style={{color:'white',backgroundColor:'white'}} onClick={closesearch} ></button><div style={{width:'100%',height:'100%'}}>
           
          <div class="row" style={{height:'75%'}}> {searchsongs.map((element, index) => (
        
        <div class="card" style={{width: '28%',height:'100%',marginRight:'1%',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey'}}>
           
        <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'60%'}}/>
        <div class="card-body">
          <h3 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h3>
          <p style={{color:'grey'}}>{element.artist}</p>
          <audio controls style={{width:'100%'}}>
                             <source src={element.song} type="audio/mpeg" />
                             Your browser does not support the audio element.
                         </audio>
                         <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                         <button type="button" onClick={()=>deletesong(element._id)}  className="btn btn-danger">Delete</button>
                         <button type="button" onClick={()=>updatesong(element._id,element.name,element.artist,element.song,element.img,element.duration)}  className="btn btn-warning">Update</button>
                         </div>
        </div>
      </div>
      
      ))}
      </div>
       </div>
       </div>
      
    }
 <h1 style={{fontWeight:'bold',textAlign:'center'}}>Songs</h1>

    <Carousel responsive={responsive}  >
      {songs.map((element, index) => (
        
           <div key={index} className='card' style={{width: '93%',height:'55%',marginTop:'35%',marginRight:'1%',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey',padding:'0'}}>
          
           <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'45%'}}/>
           <div class="card-body">
             <h4 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h4>
             <p style={{color:'grey'}}>{element.artist}</p>
             <audio controls style={{width:'100%',height:'20%'}}>
                                <source src={element.song} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingTop:'5%'}}>
                            <button type="button" onClick={()=>deletesong(element._id)}  className="btn btn-danger">Delete</button>
                            <button type="button" onClick={()=>updatesong(element._id,element.name,element.artist,element.song,element.img,element.duration)}  className="btn btn-warning">Update</button>
                            </div>
           </div>
         
         </div>
        
      ))}
     
     </Carousel >
 
    <h1 style={{textAlign:'center',marginBottom:'3%',marginTop:'-10%'}}>Playlist</h1>
    <Carousel responsive={responsive}>
      {playlist.map((element, index) => (
        
           <div key={index} class="card" style={{width: '93%',height:'70%',marginRight:'1%',marginLeft:'3%',marginBottom:'2%',backgroundColor:'black',color:'azure',borderColor:'grey',padding:'0'}}>
           <img src={element.img} class="card-img-top" alt="..." style={{width:'100%',height:'50%'}}/>
           <div class="card-body">
             <h3 class="card-title" style={{fontWeight:'bold'}}>{element.name}</h3>
             <p style={{color:'grey'}}>{element.desc.substring(0,20)}..</p>
            <p>Number of songs:{element.songs.length}</p>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingTop:'5%'}}>
                         
                            <button type="button" onClick={()=>deleteplay(element._id)}  className="btn btn-danger">Delete</button>
                            <button type="button" onClick={()=>updateplay(element._id)}  className="btn btn-warning">Update</button>
                            </div>
           </div>
         </div>
        
      ))}
    </Carousel >
    </div>
    </div>
    </>
  )
}

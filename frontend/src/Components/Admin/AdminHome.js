import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import logo from '../Images/music.png';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function AdminHome() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [users, setUsers] = useState([]);
  const [searched,setsearched]=useState("");
  const [searcheduser,setsearcheduser]=useState([]);
  const [alt,setalt]=useState(false);
  const usersFetch = async () => {
    setload(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      setUsers(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setload(false);
  };

  const deleteuser=async (id)=>{
    setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch(error){
      console.error('Error fetching users:', error);
    }
    setload(false);
  };
  const searchfetch=async ()=>{
    setload(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${searched}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      console.log(data);
     setsearcheduser(data.data);
     setalt(true);
    } catch(error){
      console.error('Error fetching users:', error);
      setalt(false);
    }
    setload(false);
  };
  const closesearch=()=>{
    setalt(false);
  }

  useEffect(() => {
    usersFetch();
  }, []);

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
 
    <div className="AdminHomediv1" style={{overflowY:'auto',overflowX:'hidden'}}>
    
      {/* Display Users */}
      <div className="user-list" style={{marginTop:'12%',width:'100%'}}>
        <h1 style={{textAlign:'center',fontWeight:'bold'}}>Users</h1>
        <form className="d-flex mt-3" role="search" style={{width:'80%',marginLeft:'10%'}}>
                <input className="form-control me-2" type="search" placeholder="Enter user id" aria-label="Search" onChange={e=>setsearched(e.target.value)} style={{color:'white'}} />
                <button className="btn btn-success" type="button" disabled={searched===""?true:false} onClick={searchfetch}>Search</button>
              </form>
{alt &&  <div key={searcheduser._id} className='rounded' style={{borderStyle:'solid',borderWidth:'2px',borderColor:'grey',margin:'2%'}}>

            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
           <h3 style={{fontWeight:'bold',marginLeft:'1%'}}>{searcheduser.name}</h3>
           <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'10%'}}>
           <button style={{marginRight:'1%'}} type="button" class="btn btn-danger" onClick={() => deleteuser(searcheduser._id)}>Delete</button>
           <button type="button" className="btn-close"  onClick={closesearch} ></button>
           </div>
           </div>
           <hr></hr>
        <ul>
        <li>  <p >User id:{searcheduser._id}</p></li> 
        <li>   <p >Email: {searcheduser.email}</p></li> 
           
           
           <li>    <p >Date of Birth:{searcheduser.date}/{searcheduser.month}/{searcheduser.year}</p></li> 
           <li>    <p >Gender:{searcheduser.gender}</p></li> 
     
            </ul>

          </div>}
        {users.map((user, index) => (
          <div key={user._id} className='rounded' style={{borderStyle:'solid',borderWidth:'2px',borderColor:'grey',margin:'2%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
           <h3 style={{fontWeight:'bold',marginLeft:'1%'}}>{user.name}</h3>
           <button style={{marginRight:'1%'}} type="button" class="btn btn-danger" onClick={() => deleteuser(user._id)}>Delete</button>
           </div>
           <hr></hr>
        <ul>
        <li>  <p >User id:{user._id}</p></li> 
        <li>   <p >Email: {user.email}</p></li> 
           
           
           <li>    <p >Date of Birth:{user.date}/{user.month}/{user.year}</p></li> 
           <li>    <p >Gender:{user.gender}</p></li> 
     
            </ul>

          </div>
        ))}
      </div>
    </div>
    </>
  );
}

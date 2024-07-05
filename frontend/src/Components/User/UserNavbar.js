import React from 'react'
import logo from '../Images/music.png'
import { Link, useNavigate } from 'react-router-dom';
export default function UserNavbar() {
  const handlelocal=()=>{
    localStorage.clear();
  }
  return (
    <div>
          <nav className="navbar navbar-dark bg-dark">
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
                  <Link className="nav-link active" aria-current="page" to="/account">My Account</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/liked">Favourite Songs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myplaylist">My Playlist</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createplaylist">Create Playlist</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus">Support</Link>
                </li>
                <li className="nav-item">
                  <Link class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={handlelocal} style={{textDecoration:'none',fontWeight:'bold',fontSize:'20px'}} to="/">
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
                 
                  </Link>
                </li>
              </ul>
             
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

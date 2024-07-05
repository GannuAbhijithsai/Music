import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Admin/Login';
import Loginuser from './Components/User/Loginuser'
import AdminHome from './Components/Admin/AdminHome';
import Songupload from './Components/Admin/Songupload';
import Adminsongs from './Components/Admin/Adminsongs';
import Adminupdatesong from './Components/Admin/Adminupdatesong';
import Home from './Components/User/Home';
import Favourite from './Components/User/Favourite';
import Profile from './Components/User/Profile';
import Contactus from './Components/User/Contactus';
import Createplaylist from './Components/User/Createplaylist';
import Myplaylist from './Components/User/Myplaylist';
import Oneplaylist from './Components/User/Oneplaylist';
import EditmyPlaylist from './Components/User/EditmyPlaylist';
import AdminPlaylistUpload from './Components/Admin/AdminPlaylistUpload';
import AdminUpdateplaylist from './Components/Admin/AdminUpdateplaylist';
import Othersongs from './Components/User/Othersongs';
import Forgotpassword from './Components/User/Forgotpassword';
import Otpverify from './Components/User/Otpverify';
import Changepassword from './Components/User/Changepassword';
function App() {
  return (
   <>
   
   
   <Routes>
   <Route path="/" element={ <Dashboard/> } />
   <Route path="/admin/login" element={ <Login/> } />
   <Route path="/user/login" element={ <Loginuser/> } />
   <Route path="/admin/home" element={ <AdminHome/> } />
   <Route path="/admin/songupload" element={ <Songupload/> } />
   <Route path="/admin/playlistupload" element={ <AdminPlaylistUpload/> } />
   <Route path="/admin/allsongs" element={ <Adminsongs/> } />
   <Route path="/admin/updatesong" element={<Adminupdatesong/>}/>
   <Route path="/admin/updateplaylist" element={<AdminUpdateplaylist/>}/>
   <Route path="/home" element={<Home/>}/>
   <Route path="/liked" element={<Favourite/>}/>
   <Route path="/account" element={<Profile/>}/>
   <Route path="/contactus" element={<Contactus/>}/>
   <Route path="/createplaylist" element={<Createplaylist/>}/>
   <Route path="/editplaylist" element={<EditmyPlaylist/>}/>
   <Route path="/myplaylist" element={<Myplaylist/>}/>
   <Route path="/oneplaylist" element={<Oneplaylist/>}/>
   <Route path="/otherplaylist" element={<Othersongs/>}/>
   <Route path="/forgotpassword" element={<Forgotpassword/>}/>
   <Route path="/verifyotp" element={<Otpverify/>}/>
   <Route path="/changepassword" element={<Changepassword/>}/>
   </Routes>
 
   </>
  );
}

export default App;

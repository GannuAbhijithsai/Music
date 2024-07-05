import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Createplaylist.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import Navbar from './UserNavbar';
import {Multiselect} from 'multiselect-react-dropdown';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default function Createplaylist() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  const classes=useStyles();
  const [load,setload]=useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);
    const [name,setname]=useState("");
    const [desc,setdesc]=useState(" ");
    const [song,setsong]=useState(undefined);
    const [image,setimage]=useState(undefined);
    const[alt,setalt]=useState(false);
    const [msg,setmsg]=useState("");
   const [ImgPerc,setImgPerc]=useState("");
   const [SongPerc,setSongPerc]=useState("");
   const [Inputs,setInputs]=useState("");
   const [songdata,setsongdata]=useState([]);
    const uploadfile=(file,fileType)=>{
      const storage = getStorage(app);
      const folder=fileType==="imageUrl"?"images/":"songs/";
      const fileName=new Date().getTime()+file.name;
      const storageRef = ref(storage,folder+fileName);
const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    fileType==="imageUrl"?setImgPerc(Math.round(progress)):setSongPerc(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(fileType==="imageUrl"){
        setimage(downloadURL);
      }else{
        setsong(downloadURL);
      }
    });
  }
);

    };

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
          setsongdata(data.data.map(song => ({ _id: song._id, name: song.name })));
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
    const imagechange = (e) => {
      const file = e.target.files[0];
      setimage(file);
      uploadfile(file, "imageUrl");
    };
    

  
    const createplaylist=async()=>{
      setload(true);
        if(image===undefined){
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/create`, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': `${localStorage.getItem('usertoken')}`,
                  },
                  body :JSON.stringify({
                    "name":name,
                    "desc":desc,
                    "songs":selectedSongs
           })
                });
                const data = await response.json();
                console.log(data);
               if(response.status!==200){
                         setalt(true);
                         setmsg(data.message);
               }else{
                alert("Playlist created Successfully");
                  window.location.reload();
               }
              } catch (error) {
                setalt(true);
                setmsg(error);
                console.error('Error fetching users:', error);
            
              }
        }else{
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/playlist/create`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('usertoken')}`,
              },
              body :JSON.stringify({
                "name":name,
                "desc":desc,
                "img":image,
                "songs":selectedSongs
       })
            });
            const data = await response.json();
            console.log(data);
           if(response.status!==200){
                     setalt(true);
                     setmsg(data.message);
           }else{
            alert("Playlist created Successfully");
            window.location.reload();
           }
          } catch (error) {
            setalt(true);
            setmsg(error);
            console.error('Error fetching users:', error);
        
          }
        }
        setload(false);
    }

    
  return (
    <div style={{width:'100vw',height:'100vh',backgroundColor:'black',color:'azure',overflowY:'auto'}}>
     <Navbar/>
     {load && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
   <div className='cplaylistdiv2'>
        <h1 style={{fontWeight:'bold'}}>Create a Playlist</h1>
       
      </div>
      {alt===true? <div class={`alert alert-danger alert-dismissible fade show`} role="alert">
    <strong>{msg}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>:""}
      <form >
        <div className='cplaylistdiv4'>
        <div className='cplaylistdiv3'>
  <div class="mb-3" style={{width:'70%'}}>
    <label for="exampleInputEmail1" class="form-label">Name of the Playlist</label>
    <input type="text" style={{color:'white'}} onChange={e=>setname(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3" style={{width:'70%'}}>
    <label for="exampleInputEmail1" class="form-label">Enter Description</label>
    <input type="text" style={{color:'white'}} onChange={e=>setdesc(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3"style={{width:'70%'}}>
    <label for="image" class="form-label">Upload the Image url {ImgPerc>0 && "Uploading:"+ImgPerc+"%"}</label>
    <input type="file" style={{color:'white'}} accept="image/*" id="image" onChange={e=>imagechange(e)} class="form-control"  />
  </div>
  <div class="mb-3"style={{width:'70%',color:'black'}}>
  <label for="exampleInputEmail1" class="form-label" style={{color:'white'}}>Select Songs</label>
  <Multiselect
options={songdata} // Options to display in the dropdown
selectedValues={songdata.selectedValue} // Preselected value to persist in dropdown
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
  </div>
  <button type="button" onClick={createplaylist} className="btn btn-success">Submit</button>
  </div>
  <div className='cplaylistdiv5'>
    
 
  </div>
  </div>
</form>
    </div>
  )
}

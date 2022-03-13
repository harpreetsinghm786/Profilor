import './App.css';
import { auth ,db,key} from './firebase';
import {  ref,onValue,child,getDatabase,update} from "@firebase/database";
import { useState, useEffect, Component } from "react"
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';



function App() {
  const [user, setUser] = useState(null)
  const [name, setname] = useState(null)
  const [email, setemail] = useState(null)
  const [url, seturl] = useState(null)
  const [add, setAdd] = useState('')

  const [newUser, setNewUser] = useState('');
  const [list,setlist]=useState([]);
  
 

  useEffect(() => {

    auth.onAuthStateChanged(async (user) => {
      setUser(user);

    
      var currentref=null;

      if(user.isAnonymous){
        currentref = ref(db, 'userdata/'+key );
        setAdd(`userdata/${key}/likes/${key}`)
        setNewUser(key)
      
    }else{
      currentref = ref(db, 'userdata/'+user.uid  );
      setAdd(`userdata/${user.uid}/likes/${user.uid}`)
      setNewUser(user.uid)
    }

    onValue(currentref, (snapshot) => {
      setname(snapshot.child("name").val());
      seturl(snapshot.child("url").val());
      setemail(snapshot.child("email").val());

   });

})

var allref=ref(db,'userdata/');
var l=[];

onValue(allref, (snapshot) => {
  
  snapshot.forEach(
    function(snapshot){

     l.push(snapshot);
     
    }
  )

  setlist(l);
  
},{
  onlyOnce: true
});

});



const handleLikes = () => {
   var v=newUser;
  update(ref(getDatabase(), add), {
       
    liked : "true" ,
})

}

 const Item =props=>{
   const {name,email,url,likes,id}=props;

   return(
     <div className='list'>
     
    <div className='list-item' style={{ margin:"10px" }}>
    <img src={url}></img>
    <span > {name}</span>

    <span style={{ color: "gray", fontWeight: "800", fontSize: "11px", textOverflow: "ellipsis", marginTop: "5px", width: "150px" }}>{email}</span>

    <span style={{ color: "gray", fontWeight: "800", fontSize: "11px", textOverflow: "ellipsis", marginTop: "5px", width: "150px" }}>24 Likes</span>

    <div style={{ border: "1px solid grey", padding: "5px", borderRadius: "20px", marginTop: "7px", justifyContent: "center", alignItems: "center", alignContent: "center", borderColor: "#0887bd" }}>
      <span onClick={() => handleLikes()} style={{ fontSize: "13px", color: "#0887bd", paddingLeft: "5px", paddingRight: "5px" }}> Add to Favoruites</span>
    </div>


  </div>
  </div>

 
   )
 }



  
  
  const signOut = () => {

    auth.signOut().then(() => {
      setUser(null)

    })
  }

  


  return (
    
    <div className="App" >

      {user == null ?
        (
          <Login />
        ) : (
          

         <Home/>
        )

      }</div>
    
  )


}

export default App;

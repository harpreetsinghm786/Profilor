import {auth,signInWithGoogle,signInAnan } from '/Users/harpreetsingh/react/profilor/src/firebase';
import axios from "axios"
import {useState,useEffect} from "react"
import { db,key} from '/Users/harpreetsingh/react/profilor/src/firebase';
import {  ref,onValue,child,getDatabase,update} from "@firebase/database";
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';


function Home(){
    
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
    <div >
  
  <div className='Home'>
            <div className='Navbar' style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", fontSize: "20px", backgroundColor: "white", justifyContent: "space-between" }}>

              <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                <div className='home-header' >
                </div>
                <div style={{ color: "grey", fontWeight: "bold" }} >Profilor</div>

                <div className='search-bar' style={{ backgroundColor: "#DCDCDC", width: "300px", borderRadius: "20px", padding: "5px", display: "flex", flexDirection: "row" }}>
                  <input type="text" placeholder='Search' style={{ width: "260px", border: "null", fontSize: "14px", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#DCDCDC", borderColor: "transparent", outline: "none", marginLeft: "5px" }}></input>
                  <div className='search-icon'></div>
                </div>

              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>


            
                <div>
                  <img className='profile-pic' src={url}></img>

                </div>

                <div onClick={signOut} className='signout-button' style={{ marginLeft: "10px", width: "100px" ,color:"grey"}}>Sign Out</div>



              </div>



            </div>


            <div className="welcome-banner" style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flex: 8, flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "start", }}>
                <span style={{ color: "white", fontWeight: "100", fontSize: "20px" }}>Welcome Back!</span>
                <div style={{ height: "10px" }}></div>
                <span style={{ color: "white" }}>{name}</span>
              </div>
              <div className='plane' style={{ flex: 2 }}> </div>
            </div>


            <div style={{
              display: "flex", flexDirection: "row", paddingLeft: "13%", paddingRight: "13%", marginTop: "10px"
            }}>
              <div className='center-line' style={{ width: "1500px", marginRight: "40px", textAlign: 'initial' }}>

                <div style={{ alignContent: "start", textAlign: "start", marginLeft: "7px", marginTop: "20px" }}>

                  <span style={{ fontSize: "13px", fontWeight: "600" }} >Favoruites</span>
                </div>



 
                <div className='fav' style={{ display: "flex", flexDirection: "row", overflowX: "true", padding: "10px", marginTop: "10px", overflowX: "true" }}>


                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>

                  <img style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>



                </div> 


                <div className='query-search-bar' style={{
                  backgroundColor: "#DCDCDC", display: "flex", flexDirection: "row", marginLeft:
                    "0px", borderRadius: "5px", marginTop: "10px"
                }}>
                  <input type="text" placeholder='Search' style={{ flex: "9", border: "null", fontSize: "14px", padding: "10px", backgroundColor: "#DCDCDC", borderRadius: "5px", borderColor: "transparent", outline: "none" }}></input>
                  <div style={{ backgroundColor: "#0887bd", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", padding: "10px", border: "1px solid #DCDCDC" }}>
                    <div className='search-icon2' style={{ height: "20px", width: "20px", backgroundSize: "cover" }}></div>
                  </div>
                </div>

              


                
               <div style={{marginTop:"20px"}}>
                    {
                      list.length>0 ? list.map(item=><Item id={item.child("id").val()} name={item.child("name").val()} email={item.email} url={item.child("url").val()} likes={item.child("liskes").val()}></Item>):[<p style={{marginTop:"20px", display: 'inline'}}>Loding...</p>]
                    }
                    </div>
               
                <div style={{ height: "50px" }}></div>

              </div>


              <div className='side-line' style={{ width: "250px", marginTop: "20px", height: "380px" }}>
                <div className='basic-profile' >
                  <img className='profilepic' src={url}></img>
                  <span style={{ color: "gray", fontWeight: "800" }}>{name}</span>
                  <div style={{ height: "5px" }}></div>
                  <span style={{ color: "gray", fontWeight: "800", fontSize: "12px" }}>{email}</span>

                </div>

                <div style={{
                  marginTop: "20px", backgroundColor: "#afe0f1", alignContent: "center", alignItems: "center", justifyContent: "center", padding:
                    "20px"
                }}>


                  <span style={{ color: "black", fontSize: "13px" }}>Profile Completerness</span>
                  <div style={{ height: "20px" }}></div>

                  <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    <div className='Progressbar' style={{ flex: "6" }}>


                      <div className='outter-layer' style={{
                        marginLeft: "5%", marginRight: "5%", height:
                          "7px", backgroundColor:
                          "white", borderRadius: "10px"
                      }}>




                        <div className='inner-layer' style={{
                          width:
                            "20%", height: "7px", backgroundColor: "#0887bd", borderRadius: "10px"
                        }}></div>

                      </div>

                    </div>

                    <div style={{ fontSize: "14px", fontWeight: "200", flex: "1", color: "black" }}> 20%</div>

                  </div>



                  <div className='social-media' style={{
                    display: "flex", flexDirection: "row", padding: "5px", marginTop: "10px", alignContent: "center", justifyContent:
                      "start", alignItems: "center"
                  }}>




                    <div style={{

                      borderRadius: "20px", color: "white", backgroundColor: "#0887bd", height: "25px", width:
                        "25px", alignContent:
                        "center",

                    }}>
                      <span style={{ fontSize: "20px" }} >+</span>

                      <div />
                    </div>


                    <div style={{ alignContent: "center", marginLeft: "7px" }}>

                      <span style={{ fontSize: "13px" }} >Connect Social Media </span>
                    </div>

                  </div>






                </div>
                <button  style={{ height: "40px", width: "250px", backgroundColor: "white", border: "none", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", cursor: "pointer" }}>

                  <div style={{ alignContent: "center", marginLeft: "7px" }}>

                    
                    <Link to="/profile"><span style={{ fontSize: "13px" }} >Edit Profile</span></Link>

                    
                  </div>

                </button>
              </div>



            </div>


          </div>
    
     
    </div>
  )
    
}

export default Home;

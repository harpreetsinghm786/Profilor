import { auth, signInWithGoogle, signInAnan } from '/Users/harpreetsingh/react/profilor/src/firebase';
import axios from "axios"
import { key } from '/Users/harpreetsingh/react/profilor/src/firebase';
import { useState, useEffect } from "react"
import { db } from '/Users/harpreetsingh/react/profilor/src/firebase';
import { set, ref, onValue, child, getDatabase, update, numChildren, remove } from "@firebase/database";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { render } from '@testing-library/react';
import Pagination from '../Pagination/Pagination';

const Item = props => {

  const { name, email, url, likes, id, newUser, curl } = props;



  return (
    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={{ pathname: "/profileviewer" }} state={{ id: id, newUser: newUser, url: curl }}>
      <div className='list'>

        <div className='list-item' style={{ margin: "10px" }}>
          <img src={url}></img>
          <span > {name}</span>

          <span style={{ color: "gray", fontWeight: "800", fontSize: "11px", textOverflow: "ellipsis", marginTop: "5px", width: "150px" }}>{email}</span>


          <span style={{ color: "gray", fontWeight: "800", fontSize: "11px", textOverflow: "ellipsis", marginTop: "5px", width: "150px" }}>{likes} likes</span>


          <div style={{ border: "1px solid grey", padding: "5px", borderRadius: "20px", marginTop: "7px", justifyContent: "center", alignItems: "center", alignContent: "center", borderColor: "#0887bd" }}>
            <span style={{ fontSize: "13px", color: "#0887bd", paddingLeft: "5px", paddingRight: "5px" }}> Visit Profile</span>
          </div>


        </div>
      </div>
    </Link>



  )
}

const FavItem = props => {
  const { url, id ,newUser,curl} = props;
  return (
    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={{ pathname: "/profileviewer" }} state={{ id: id, newUser: newUser, url: curl }}>
    <img className='favitem' style={{ height: "60px", width: "60px", borderRadius: "100px", marginLeft: "10px" }} src={url}></img>
    </Link>
  )
}

function Home() {

  const history = useNavigate();


  const [user, setUser] = useState(null)
  const [name, setname] = useState(null)
  const [email, setemail] = useState(null)
  const [url, seturl] = useState(null)
  const [add, setAdd] = useState('')
  const [fav, setfav] = useState(null);
  const [newUser, setNewUser] = useState('');
  const [list, setlist] = useState([]);
  const [search, setsearch] = useState('');


  
 



  useEffect(() => {
 
    var currentref = null;

    auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user.isAnonymous) {
        currentref = ref(db, 'userdata/' + key);
        setAdd(`userdata/${key}/likes/${key}`)
        setNewUser(key)

      } else {
        currentref = ref(db, 'userdata/' + user.uid);
        setAdd(`userdata/${user.uid}/likes/${user.uid}`)
        setNewUser(user.uid)
      }

      onValue(currentref, (snapshot) => {
        setname(snapshot.child("name").val());
        seturl(snapshot.child("url").val());
        setemail(snapshot.child("email").val());


      });


    })



    var allref = ref(db, 'userdata/');
    var l = [];
    var pageNumer=[];
    
    onValue(allref, (snapshot) => {

      snapshot.forEach(
        function (snapshot) {

          l.push(snapshot.val());

        }
      )

      setlist(l);
      
      // for(let i=1;i<=Math.ceil(list.length/usersperpage);i++){
      //   pageNumer.push(i);
      // }
      // const indexOfLastPost = currentpage * usersperpage;
      // const indexOfFirstPost = indexOfLastPost - usersperpage;
      //setclist(list.slice(indexOfFirstPost, indexOfLastPost));
   
      
    
      // setpaging(pageNumer);

  
    }, {
      onlyOnce: true
    });
  
      
  

  

  });




  const signOut = () => {
    auth.signOut().then(() => {
      history("/");

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



            <div >

              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile"> <img className='profile-pic' src={url}></img></Link>



            </div>

            <div onClick={signOut} className='signout-button' style={{ marginLeft: "10px", width: "100px", color: "grey" }}>Sign Out</div>

          </div>



        </div>


        <div className="welcome-banner" style={{ display: "flex", flexDirection: "row" }}>
          <div className='banner-content'>
            <span className='welcome-back'>Welcome Back!</span>
            <div style={{ height: "10px" }}></div>
            <span className='banner-name'>{name}</span>
          </div>
          <div className='plane' > </div>
        </div>


        <div style={{
          display: "flex", flexDirection: "row", paddingLeft: "13%", paddingRight: "13%", marginTop: "10px"
        }}>
          <div className='center-line' style={{ width: "1500px", marginRight: "40px", textAlign: 'initial' }}>

            <div style={{ alignContent: "start", textAlign: "start", marginLeft: "7px", marginTop: "20px" }}>

              <span style={{ fontSize: "13px", fontWeight: "600" }} >Favorites</span>
            </div>




            <div className='fav' style={{ display: "flex", flexDirection: "row", overflowX: "true", padding: "10px", marginTop: "10px", overflowX: "true" }}>
              {
                list.sort(function (a, b) {

                  if (a.name < b.name) { return -1; }
                  if (a.name > b.name) { return 1; }
                  return 0;
                }),

                list.length > 0 ? list.map(item => item["likes"] == null ?
                  <div></div>
                  :

                  item["likes"][newUser] != null ? <FavItem id={item["id"]}
                    url={item["url"]} curl={url} newUser={newUser}
                  >
                  </FavItem> : null)

                  :

                  [<p style={{ marginTop: "20px", display: 'inline' }}>Loding...</p>]
              }



            </div>


            <div className='query-search-bar' style={{
              backgroundColor: "#DCDCDC", display: "flex", flexDirection: "row", marginLeft:
                "0px", borderRadius: "5px", marginTop: "10px"
            }}>
              <input type="text" placeholder='Search' onChange={events => { setsearch(events.target.value) }} style={{ flex: "9", border: "null", fontSize: "14px", padding: "10px", backgroundColor: "#DCDCDC", borderRadius: "5px", borderColor: "transparent", outline: "none" }}></input>
              <div style={{ backgroundColor: "#0887bd", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", padding: "10px", border: "1px solid #DCDCDC" }}>
                <div className='search-icon2' style={{ height: "20px", width: "20px", backgroundSize: "cover" }}></div>
              </div>
            </div>





            <div style={{ marginTop: "20px", }}>
              {
                list.filter((val) => {
                  if (search == '') {
                    return val;
                  } else if (val.name.toLowerCase().includes(search.toLowerCase())) {

                    return val;
                  }
                }).length > 0 ? list.filter((val) => {
                  if (search == '') {
                    return val;
                  } else if (val.name.toLowerCase().includes(search.toLowerCase())) {

                    return val;
                  }
                }).map(item => item["id"] == newUser ? null
                  :

                  <Item id={item["id"]}
                    name={item["name"]}
                    email={item["email"]}
                    url={item["url"]}
                    newUser={newUser}
                    curl={url}
                    likes={item["likes"] == null ? 0 : Object.keys(item["likes"]).length}
                  >

                  </Item>)

                  :

                  [<p style={{ marginTop: "20px", display: 'inline' }}>No User Found</p>]
              }
            </div>

                   </div>

        </div>


      </div>
      <div style={{height:"100px"}}></div>

     

       {/* <div>{
        
              <div>
                  <ul style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                      {paging.map(number=>
                      <div className="pageitem" style={{backgroundColor:currentpage==number?"#0887bd":"#afe0f1",color:currentpage==number?"white":"black"}}><span>{number}</span></div>
                      
                      )}
                  </ul>
                  
              </div>
            }
        </div> */}

      <div className="footer" style={{ backgroundColor: "#afe0f1", height: "450px", marginTop: "50px", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "4", display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", alignItems: "center", height: "100px", marginTop: "30px" }}>
          <div className='home-header' style={{ alignItems: "center", justifyContent: "center", height: "80px", width: "80px" }}>
          </div>
          <div style={{ color: "black", fontWeight: "bold", fontSize: "20px" }} >Profilor</div>
        </div>
        <div style={{ justifyContent: "space-between", flex: "6", display: "flex", flexDirection: "row", marginTop: "50px", marginRight: "13%" }}>

          <div style={{ display: "flex", flexDirection: "column" }}>

            <span style={{ margin: "20px" }}>Home</span>
            <span style={{ margin: "20px" }}>About</span>
            <span style={{ margin: "20px" }}>Contact Us</span>
            <span style={{ margin: "20px" }}>Projects</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>

            <span style={{ margin: "20px" }}>Network</span>
            <span style={{ margin: "20px" }}>Safety</span>
            <span style={{ margin: "20px" }}>Advertisements</span>

          </div>


          <div style={{ display: "flex", flexDirection: "column" }}>

            <span style={{ margin: "20px" }}>Connects</span>
            <span style={{ margin: "20px" }}>Social Portal</span>
            <span style={{ margin: "20px" }}>Profile</span>
            <span style={{ margin: "20px" }}>Management</span>
          </div>





        </div>

      </div>

      <div style={{ height: "50px", backgroundColor: "#afe0f1", alignContent: "start", width: "100%", display: "flex" }}>
        <span style={{ fontSize: "15px", width: "100%", textAlign: "center" }}>© Copyright 2021-2022</span>
      </div>


    </div>
  )


}

export default Home;

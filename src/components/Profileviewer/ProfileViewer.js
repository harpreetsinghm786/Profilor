import React from "react";
import { auth, db } from "../../firebase";
import { key } from "../../firebase";
import { ref, onValue, child, set, getDatabase, update ,remove} from "@firebase/database";
import { useState, useEffect, Component } from "react"
import { Link ,useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Login from "../Login/Login";


function ProfileViewer(props) {
    let navigate = useNavigate();

    const [name, setname] = useState(null)
    const [email, setemail] = useState(null)
    const [url, seturl] = useState(null)
    const [status, setStatus] = useState('')
    const [linkedin, setlinkedin] = useState('');
    const [instagram, setinstagram] = useState('');
    const [github, setgithub] = useState('');
    const [perc, setperc] = useState(40);
    const [likes, setlikes] = useState(null);
    const [liked, setliked] = useState(null);
    const location = useLocation();





    var currentref = null;

    const getperc = () => {
        if (github != "" && instagram != "" && linkedin != "") {
            setperc(100);
        }

        if (github == "" && instagram != "" && linkedin != "" || github != "" && instagram == "" && linkedin != "" || github != "" && instagram != "" && linkedin == "") {
            setperc(80);
        }

        if (github != "" && instagram == "" && linkedin == "" || github == "" && instagram != "" && linkedin == "" || github == "" && instagram == "" && linkedin != "") {
            setperc(60);
        }


    }



    useEffect(() => {

        currentref = ref(db, 'userdata/' + location.state.id);


        onValue(currentref, (snapshot) => {
            setname(snapshot.child("name").val());
            seturl(snapshot.child("url").val());
            setemail(snapshot.child("email").val());
            setStatus(snapshot.child("status").val());
            setlinkedin(snapshot.child("linkedin").val());
            setinstagram(snapshot.child("instagram").val());
            setgithub(snapshot.child("github").val());
            setlikes(snapshot.child("likes").val() != null ? Object.keys(snapshot.child("likes").val()).length : 0)
            setliked(snapshot.child("liked").val() != null ? Object.keys(snapshot.child("liked").val()).length : 0)

        });


        getperc();

        console.log(props);


    })


    const signOut = () => {
        auth.signOut();
        navigate("/");
        
    }


    const handleLikes = () => {
        var currentref = ref(db, 'userdata/' + location.state.id + "/likes/" + location.state.newUser);
        onValue(currentref, (snapshot) => {
          const data = snapshot.val();
          if (data == null) {
            set(ref(db, 'userdata/' + location.state.id + "/likes/" + location.state.newUser), {
              url: url,
              id: location.state.newUser,
            })
    
            set(ref(db, 'userdata/' + location.state.newUser + "/liked/" + location.state.id), {
              liked: "true",
            })
    
    
          } else {
            remove(ref(db, 'userdata/' + location.state.id+ "/likes/" + location.state.newUser));
            remove(ref(db, 'userdata/' + location.state.newUser + "/liked/" + location.state.id));
          }
        }, {
          onlyOnce: true
        });
    
      }





    return (

        <>

            <div style={{ justifyContent: "center", display: "flex", alignContent: "start", justifyItems: "start", justifyContent: "start", flexDirection: "column" }}>
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
                        <Link style={{ color: 'inherit', textDecoration: 'inherit',cursor:"pointer" }} to="/profile"> <img className='profile-pic' src={location.state.url}></img></Link>

                            

                        </div>
                        <div onClick={signOut} className='signout-button' style={{ marginLeft: "10px", width: "100px", color: "grey" }}>Sign Out</div>


                    </div>



                </div>

                <div style={{ display: "flex", flexDirection: "row", marginLeft: "13%", marginRight: "13%", marginTop: "20px" }}>

                    {/* left section */}

                    <div style={{ flex: "4" }}>
                        <div className='side-line' style={{ width: "270px", marginTop: "20px", justifyContent: "center", alignContent: "center" }}>
                            <div className='basic-profile' style={{ paddingTop: "30px" }}>
                                <img className='profilepic' src={url}></img>
                                <span style={{ color: "black", fontWeight: "800" }}>{name}</span>
                                <div style={{ height: "5px" }}></div>
                                <span style={{ color: "gray", fontWeight: "800", fontSize: "12px" }}>{email}</span>

                            </div>

                            <div style={{ padding: "10px", color: "black", display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{liked}</span>
                                    <span style={{ marginTop: "7px", fontSize: "15px" }}>Liked</span>
                                </div >
                                <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{likes}</span>
                                    <span style={{ marginTop: "7px", fontSize: "15px" }}>Likes</span>
                                </div>

                            </div>

                            <div style={{
                                marginTop: "20px", backgroundColor: "#afe0f1", alignContent: "center", alignItems: "center", justifyContent: "center", padding:
                                    "20px"
                            }}>


                                <span style={{ color: "black", fontSize: "13px", marginLeft: "10px" }}>Profile Completerness</span>
                                <div style={{ height: "20px" }}></div>

                                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <div className='Progressbar' style={{ flex: "6" }}>


                                        <div className='outter-layer' style={{
                                            width: "170px",
                                            marginLeft: "5%", marginRight: "5%", height:
                                                "7px", backgroundColor:
                                                "white", borderRadius: "10px"
                                        }}>




                                            <div className='inner-layer' style={{
                                                width: (perc / 100) * 170, height: "7px", backgroundColor: "#0887bd", borderRadius: "10px"
                                            }}></div>

                                        </div>

                                    </div>

                                    <div style={{ fontSize: "14px", fontWeight: "200", flex: "1", color: "black" }}> {perc}%</div>

                                </div>






                            </div>

                        </div>
                    </div>


                    {/* right section */}
                    <div style={{ flex: "9", justifyContent: "start", alignContent: "start" }}>

                        <div style={{ justifyContent: "start", alignContent: "center", display: "flex", flexDirection: "column", alignItems: "start", marginTop: "20px" }}>


                            <div style={{display:"flex",flexDirection:"row",justifyContent:'space-between',width:"100%"}} >


                                <span style={{ color: "#0887bd", fontWeight: "600", fontSize: "30px" }}>Profile</span>
                                <div style={{ border: "1px solid grey", padding: "5px", borderRadius: "20px", marginTop: "7px", justifyContent: "center", alignItems: "center", alignContent: "center", borderColor: "#0887bd" }}>
                                    <span onClick={handleLikes} style={{ fontSize: "13px", color: "#0887bd", paddingLeft: "5px", paddingRight: "5px" ,cursor:"pointer"}}> Add to Favoruites</span>
                                </div>

                            </div>

                            <span style={{ color: "black", fontWeight: "600", fontSize: "16px", marginTop: "30px" }}>Basic Profile</span>

                            <div style={{ height: "20px" }}></div>

                            <div style={{ color: "grey", font: "600" }}>
                                <span style={{ color: "grey", fontWeight: "600" }}>Username : </span>
                                {name}</div>


                            <div style={{ height: "20px" }}></div>


                            <div style={{ color: "grey", font: "600" }}>
                                <span style={{ color: "grey", fontWeight: "600" }}>Status : </span>
                                {status}</div>






                            <span style={{ color: "black", fontWeight: "600", fontSize: "16px", marginTop: "30px" }}>Social Media</span>

                            <div style={{ height: "20px" }}></div>

                            <div style={{ color: "grey", font: "600" }}>
                                <span style={{ color: "grey", fontWeight: "600" }}>Linkedin : </span>
                                {linkedin}</div>



                            <div style={{ height: "20px" }}></div>


                            <div style={{ color: "grey", font: "600" }}>
                                <span style={{ color: "grey", fontWeight: "600" }}>Instagram : </span>
                                {instagram}</div>



                            <div style={{ height: "20px" }}></div>


                            <div style={{ color: "grey", font: "600" }}>
                                <span style={{ color: "grey", fontWeight: "600" }}>Github : </span>
                                {github}</div>







                        </div>
                    </div>
                </div>





            </div>

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
        </>

    );


};

export default ProfileViewer;
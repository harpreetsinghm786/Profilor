import React from "react";
import { auth, db, key } from "../../firebase";
import { ref, onValue, child, set, getDatabase ,update} from "@firebase/database";
import { useState, useEffect, Component } from "react"
import { Link } from "react-router-dom";
import Login from "../Login/Login";


function Profile() {
    const [user, setUser] = useState(null)
    const [name, setname] = useState(null)
    const [email, setemail] = useState(null)
    const [url, seturl] = useState(null)
    const [status,setStatus]=useState('')
    const [add, setAdd] = useState('')
    const [status2,setStatus2]=useState('')

    useEffect(() => {

        auth.onAuthStateChanged(async (user) => {
            setUser(user);


            var currentref = null;

            if (user.isAnonymous) {
                currentref = ref(db, 'userdata/' + key);
                setAdd(`userdata/${key}`)

            } else {
                currentref = ref(db, 'userdata/' + user.uid);
                setAdd(`userdata/${user.id}`)

            }

            onValue(currentref, (snapshot) => {
                setname(snapshot.child("name").val());
                seturl(snapshot.child("url").val());
                setemail(snapshot.child("email").val());
                setStatus(snapshot.child("status").val())
            });



        })



    });

  const submitHandler = e => {
    var currentref = null;

    if (user.isAnonymous) {
        currentref = ref(db, 'userdata/' + key);
      

    } else {
        currentref = ref(db, 'userdata/' + user.uid);
       

    }
    

    update(currentref, {
        "status": status2,
    })

    }

    return (

        <>


        <div style={{ justifyContent: "center", display: "flex", alignContent: "start", justifyItems: "start", justifyContent: "start", height: "100vh", flexDirection: "column" }}>
            <div className='Navbar' style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", fontSize: "20px", backgroundColor: "white", justifyContent: "space-between" }}>

                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    <div className='home-header' >
                    </div>
                    <div style={{ color: "grey", fontWeight: "bold" }} >Profilor</div>

                    <div className='search-bar' style={{ backgroundColor: "#DCDCDC", width: "300px", borderRadius: "20px", padding: "5px", display: "flex", flexDirection: "row" }}>
                        <input type="text" placeholder='Search'  style={{ width: "260px", border: "null", fontSize: "14px", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#DCDCDC", borderColor: "transparent", outline: "none", marginLeft: "5px" }}></input>
                        <div className='search-icon'></div>
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>



                    <div>
                        <img className='profile-pic' src={url}></img>

                    </div>

                    {/* <div className='signout-button' onClick={signOut} style={{ marginLeft: "10px", width: "100px" }}>Sign Out</div>
 */}


                </div>



            </div>


            <div className="welcome-banner" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flex: 8, flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "start", }}>
                    <span style={{ color: "white", fontWeight: "100", fontSize: "20px" }}>Edit Profile</span>
                    <div style={{ height: "10px" }}></div>
                    <span style={{ color: "white" }}>{name}</span>
                </div>
                <div className='plane' style={{ flex: 2 }}> </div>
            </div>


            <div style={{ justifyContent: "center", alignContent: "center", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div className='basic-profile' >
                    <img className='profilepic' src={url}></img>
                    <span style={{ color: "gray", fontWeight: "800" }}>{name}</span>
                    <div style={{ height: "5px" }}></div>
                    <span style={{ color: "gray", fontWeight: "800", fontSize: "12px" }}>{email}</span>

                </div>


                < div >
                "Your Status : {status}"
                </div>


                <div className='status-field' style={{
                    backgroundColor: "#DCDCDC", width: "450px", display: "flex", flexDirection: "row", marginLeft:
                        "0px", borderRadius: "5px", marginTop: "10px", height: "40px"

                }}>
                    <input type="text" placeholder='Status'  onChange={(e) => setStatus2(e.target.value)}  style={{ flex: "9", border: "null", fontSize: "14px", padding: "10px", backgroundColor: "#DCDCDC", borderRadius: "5px", borderColor: "transparent", outline: "none" }}></input>

                </div>



             <div style={{display:"flex",width: "450px"}} >

                <button onClick={() => submitHandler(status2)} style={{flex:"1", height: "40px", backgroundColor: "#0887bd", color: "white", border: "none", borderRadius: "5px", borderBottomRightRadius: "5px", cursor: "pointer", marginTop: "10px" }}>

                    <div style={{ alignContent: "center" }}>

                        <span style={{ fontSize: "13px" }} >Save</span>

                    </div>

                </button>
                

            </div>
</div>
        


        </div>
    </>
            
    );
};

export default Profile;
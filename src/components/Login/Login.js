import {auth,signInWithGoogle,signInAnan } from '/Users/harpreetsingh/react/profilor/src/firebase';
import axios from "axios"
import {useState,useEffect} from "react"


function Login(){
    
  return (
    <div >
          <div className='screen' >
            <div style={{flex:"5",
                  alignItems:"left",
                  justifyContent:"left",
                  textAlign:"left",
                  display:"flex",
                  flexDirection:"column"}}>
            
            
            <div className='header'>
              <div className='logo'></div>
              <span style={{padding:"7px",fontSize:"50px"}}>Profilor</span>
            </div>

            <div style={{padding:"20px",flex:"8",fontSize:"15px",margin:"10px",justifyContent:"start",alignContent:"start",alignItems:"start"}}>

           <div style={{display:"flex",flexdirection:"row",alignContent:"center",fontSize:"20px",fontWeight:"bold"}}>
           <div className='tag'></div>
           <div style={{padding:"10px",fontweight:"bold",}}>Disclamer</div>
            
           </div>

           
           <div style={{height:"10px"}}></div>
          
            <div style={{margin:"10px",justifyContent:"left",alignContent:"left",textAlign:"left"}}>Profilor is a Platform on which you can maintain you Profile either by Google or Anonymous Account. It has an Amazing and User friendly Interface which will allow you to do all the tasks easily. You can see the profile of other users , you can like them also. Apart from it you can update your Profile in real time just by single click.</div>

           <div style={{margin:"10px",justifyContent:"left",alignContent:"left",textAlign:"left"}}>Profilor is a Platform on which you can maintain you Profile either by Google or Anonymous Account. It has an Amazing and User friendly Interface which will allow you to do all the tasks easily.</div>

            <div style={{margin:"10px",justifyContent:"left",alignContent:"left",textAlign:"left"}}>You can see the profile of other users , you can like them also. Apart from it you can update your Profile in real time just by single click.</div>

            </div>
              <div  style={{flex:"1",padding:"40px",fontSize:"14px",backgroundColor:"black"}}>
                <span style={{color:"white"}}>Powered By Plug <br/></span>
                <span style={{fontsize:"10px",color:"white"}}> © Copyright 2021-2022</span>

              </div>
            
    
         </div>
            
            <div style={{flex:5}}> 
          <div className='sign-in'>

            <div className='signin-head'>Sign In</div>

        <div className='profile-sign-in'></div>
         
        
        <div onClick={signInWithGoogle} className='signout-button'>Google SignIn</div>
        
        <div onClick={signInAnan} className='signout-button'>Sign In Anonymously</div>
       
        </div>
        </div>
        </div>
        
            
        
    
     
    </div>
  )
    
}

export default Login;

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import axios from "axios";
import { getDatabase, set, ref, child ,onValue} from "@firebase/database";



const app = firebase.initializeApp({
    apiKey: "AIzaSyDf0lBWQlPG5S9rBKlVXTSlx31jnVBiD7k",
    authDomain: "profilor-94213.firebaseapp.com",
    databaseURL: "https://profilor-94213-default-rtdb.firebaseio.com",
    projectId: "profilor-94213",
    storageBucket: "profilor-94213.appspot.com",
    messagingSenderId: "404260800207",
    appId: "1:404260800207:web:713f043540beef34e5d9ba"
});

export const auth = firebase.auth();
export const db = getDatabase();

const googleProvider = new firebase.auth.GoogleAuthProvider()



export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {


        set(ref(getDatabase(), "userdata/" + res.user.uid), {
            "name": res.user.displayName,
            "email": res.user.email,
            "id": res.user.uid,
            "url": res.user.photoURL,
            "likes": "null",
            "status":"null",
        })

    }).catch((error) => {
        console.log(error.message)
    })
}

var navigator_info = window.navigator;
var screen_info = window.screen;
var uid = navigator_info.mimeTypes.length;
uid += navigator_info.userAgent.replace(/\D+/g, '');
uid += navigator_info.plugins.length;
uid += screen_info.height || '';
uid += screen_info.width || '';
uid += screen_info.pixelDepth || '';




export const signInAnan = () => {
    axios.get("https://randomuser.me/api/").then((response) => {
      // console.log(response);
        // console.log(response.data.results[0]["login"].password);

       



        auth.signInAnonymously().then((res)=>{

    const starCountRef =  ref(db, 'userdata/'  );
        onValue(starCountRef, (snapshot) => {
               if(!snapshot.hasChild(uid)){
                set(ref(getDatabase(), "userdata/" + uid), {
                    "name": response.data.results[0]["name"].first+ " "+response.data.results[0]["name"].last,
                    "email": response.data.results[0].email,
                    "id": uid,
                    "url": response.data.results[0].picture.medium,
                    "likes": "null",
                    "status":"null",
                })
               }
        });

         })




    });
}


export const key=uid;

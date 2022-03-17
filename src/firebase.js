import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import axios from "axios";
import { getDatabase, set, ref, child, onValue, remove } from "@firebase/database";



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

        var currentref = ref(db, 'userdata/' + res.user.uid);
        onValue(currentref, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                set(ref(getDatabase(), "userdata/" + res.user.uid), {
                    "name": res.user.displayName,
                    "email": res.user.email,
                    "id": res.user.uid,
                    "url": res.user.photoURL,
                    "status": "Hey am using Profilor",
                    "linkedin": "",
                    "instagram": "",
                    "github": "",
                })

            }
        }, {
            onlyOnce: true
        });




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

        var currentref = ref(db, 'userdata/' + uid);


        onValue(currentref, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                set(ref(db, 'userdata/' + uid), {
                    "name": response.data.results[0]["name"].first + " " + response.data.results[0]["name"].last,
                    "email": response.data.results[0].email,
                    "id": uid,
                    "url": response.data.results[0].picture.medium,
                    "status": "Hey am using Profilor",
                    "linkedin": "",
                    "instagram": "",
                    "github": "",

                }).then((e) => {
                    auth.signInAnonymously();
                })
            } else {
                auth.signInAnonymously();
            }
        }, {
            onlyOnce: true
        });



    });
}



export const key = uid;




// --------------------------delete------------------
//  remove(ref(db,"/userdata/"+res.user.uid));

//------------------------set-----------------------
// set(ref(getDatabase(), "userdata/" + res.user.uid), {
//     "name": res.user.displayName,
//     "email": res.user.email,
//     "id": res.user.uid,
//     "url": res.user.photoURL,
//     "likes": "null",
//     "status":"null",
// })

// ----------------read---------------------
// currentref = ref(db, 'userdata/' + key);
// onValue(currentref, (snapshot) => {
//     const data=snapshot.val();
//   if(data!=null){
//     setname(snapshot.child("name").val());
//     seturl(snapshot.child("url").val());
//     setemail(snapshot.child("email").val());
//    }
//   });

//----------------update-----------------
// update(ref(db, 'userdata/' + id + "/likes/" + user.uid), {
//   liked: "true",
// })
import './App.css';
import { auth ,db,key} from './firebase';
import { useState, useEffect} from "react"
import Login from './components/Login/Login';
import Home from './components/Home/Home';



function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {

    auth.onAuthStateChanged(async (user) => {
      setUser(user);

})


});




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

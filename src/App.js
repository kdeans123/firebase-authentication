import React from 'react';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import './App.css';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "Land $400k job",
      description: "Finish FES",
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
  }

React.useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setLoading(false);
    if (user) {
      setUser(user)
    }
  })
}, [])

  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then((data) => {
        setUser(user);
      })
      .catch((error) => {
        setErrorMessage('The password is invalid or the user does not have a password')
        console.log(error);
      })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }


  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      
    </div>
  );
}

export default App;



// whenever we have export from, we always use brackets when we import 
// we we are passing auth email and password, and then .then so we are using promises with then 
// the catch will run when for example ther eis alreday an email registered, if password is not long enough 
// when you do it in real project you do not hard code email, you want to use hooks 
// const[email, setEmail] and then you will have an input field that sets the email 
//  when you first load the page, you need to pass an empty array 
// onAuthStateChanged - so when the page loads user does not hav eto log in again 

//  when you want to have all the post son the page you create a new function getAllPosts and you add import getDocs
// this changes every element into java script:   const posts = docs.map(elem => elem.data()); 
// best practice is to add spread operator:  const posts = docs.map(elem => {...elem.data()}); and this allows us to add new propert "Id" 
import React from 'react';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
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

  async function updatePost() {
    const hardCodedId = "1KzAVXDpeRIdEfSmxlQx";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardcoded);
    const newPost = {
      ...post,
      title: "Land $300k job"
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "1KzAVXDpeRIdEfSmxlQx";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Land $400k job",
      description: "Finish FES",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
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
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>/Update Post</button>
      <button onClick={deletePost}>/Delete Post</button>
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
// query gives 2 arguments that we can play around with 
// this is going to work when they are logged in:    where("uid", "==", user.uid) 
// and you do this if you onlky want to change one field, you use spread operator:  ...post,        title: "Land $300k job"
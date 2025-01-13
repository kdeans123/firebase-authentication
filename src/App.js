import { auth } from '.firebase/init';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
} from '.firebase/auth';

import './App.css';

function App() {
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
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        setErrorMessage('The password is invalid or the user does not have a password')
        console.log(error);
      })
  }


  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;



// whenever we have export from, we always use brackets when we import 
// we we are passing auth email and password, and then .then so we are using promises with then 
// the catch will run when for example ther eis alreday an email registered, if password is not long enough 
// when you do it in real project you do not hard code email, you want to use hooks 
// const[email, setEmail] and then you will have an input field that sets the email 
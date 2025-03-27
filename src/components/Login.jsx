import { useState, useRef } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firbase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [signForm, setSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const toggleSignInForm=()=>{
    setErrorMessage("")
    setSuccessMessage("");
    setSignIn(!signForm)
  }

  const handleButtonClick=()=>{
    //validate the form data 
    console.log(email.current.value.toLowerCase());
    console.log(password.current.value)
    const msg = checkValidateData(email.current.value,password.current.value)
    setErrorMessage(msg);
    if(msg) return;
    if(!signForm){
      //sign up the user
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          setSuccessMessage("User Sign up successfully");
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/108270460?v=4"
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
            navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error);            // ...
          });
          
          console.log(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-"+errorMessage);
          // ..
        });
    }else{
      //sign in the user
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          setSuccessMessage("User Sign in successfully");
          navigate("/browse");
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-"+errorMessage);
        });
    }
    
    
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img
          src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg" 
          alt="background image" 
        />
      </div> 
      <form onSubmit={(e)=>e.preventDefault()} className="p-12 bg-black/30 absolute w-3/12 my-24 mx-auto right-0 left-0 rounded-lg text-white backdrop-blur-sm">
        <h1 className="font-bold text-center text-3xl py-4">
          {signForm ? "Sign in":"Sign  Up"}
        </h1>
        {
          signForm || 
            <input 
              ref={name}
              type="text" 
              placeholder="Enter your name" 
              className="p-2 my-2  w-full rounded-lg text-black bg-slate-300"
            />
        }
        <input 
          ref={email}
          type="email" 
          placeholder="Email address" 
          className="p-2 my-2  w-full rounded-lg text-black bg-slate-300"
        />

        <input 
          ref={password}
          type="password" 
          placeholder="Password" 
          className="p-2 my-2  w-full rounded-lg text-black bg-slate-300"
        />
        <button className="py-2 rounded-lg my-6 bg-red-600 w-full cursor-pointer" onClick={handleButtonClick}>
          {signForm ? "Sign in":"Sign up"}
        </button>
        {errorMessage && <p className="text-red-600 text-xs">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-xs">{successMessage}</p>}
        <div className="my-4 py-2 cursor-pointer" onClick={toggleSignInForm}>
          <p>
            {signForm ? "New to Netflix? Sign up now.":"Already a member? Sign in now."}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
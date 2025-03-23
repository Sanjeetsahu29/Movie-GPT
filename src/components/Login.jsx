import { useState, useRef } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate";
const Login = () => {
  const [signForm, setSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm=()=>{
    setErrorMessage("")
    setSignIn(!signForm)
  }

  const handleButtonClick=()=>{
    //validate the form data 
    console.log(email.current.value.toLowerCase());
    console.log(password.current.value)
    const msg = checkValidateData(email.current.value,password.current.value)
    setErrorMessage(msg);
    
    
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
        <p className="text-red-500 text-xs ">{errorMessage}</p>
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
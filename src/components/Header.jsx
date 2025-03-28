import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firbase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();
  const handleSignout = ()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
      console.log(error);
      
      navigate("/error")
    });
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
        navigate("/");
      }
    });
    
  },[]);
  
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo" 
        className="w-44 "
      /> 
      {
        user && (
          <div className="flex items-center gap-5">
            <img src={user.photoURL} alt="user image" className="w-12 h-12 rounded-[50%]"/>
            <button className="bg-red-500 rounded-lg px-4 py-2 cursor-pointer text-white font-bold" onClick={handleSignout}>Sign out</button>
          </div>
        )
      }
    </div>
  )
}

export default Header
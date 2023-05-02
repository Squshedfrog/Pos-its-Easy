
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';import './NavBar.css'
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {

  const [user] = useAuthState(auth);
  

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  const navigate = useNavigate();
  const handleChange = e =>{
    if(e.target.checked){
      navigate('/')
    } else {
      navigate('/orders')
    }
  }  

  return (
    <nav className='nav-bar'> 
      <div className="nav-left">
        <Link to={'/'} className="nav-link"><h1 >Pos its Easy</h1></Link>
      
      </div>
      
      <div className="nav-right">
        <div className="nav-right">
        
        <Link to={'/orders'} className="nav-link"><h3 >Orders</h3></Link>
        </div >
        <div className="nav-left">
          {user ? (
            <p onClick={signOut} className="sign-out">Sign Out</p>
          ) : (
            <p onClick={signIn} className="sign-in">Login</p>
          )}
        </div>
      </div> 
    </nav>
  );
}

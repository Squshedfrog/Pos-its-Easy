import React from 'react';
import Logo from '../images/logo.png'
import './WelcomePage.css'
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


function WelcomePage(){


    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
      };


    return (
        <div className='welcome-page'>
             <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
            <div className="flex-container">
            <section className="welcome-left">
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem aliquam totam magnam earum esse repellendus qui illo ipsa illum? Dolorem rerum </p>
                <button className='login-btn' onClick={signIn}>Login</button>
            </section>
            <section className="welcome-right">
                <img className='logo' src={Logo} alt="logo" />
            </section>
            </div>
            <footer>
            <p class="copyright">© Some Company 2023</p>
            </footer>
        </div>
    );
}

export default WelcomePage;

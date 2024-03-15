// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <nav>
      <div>
        <Link to="/" id='home'>
          <img  id='logo' src="https://framerusercontent.com/images/JIGxJx8GMOk6rm8bEDGCVFF0L9w.png" alt="" />
        </Link>
      </div> 
   
      <div>
        {isAuthenticated && (
          <Link to="/filelist" id='filelist'>
            <button className='button'>File List</button>
          </Link>
        )}
   
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span id='welcome'>Welcome, {user.nickname || user.name}!</span>
            <button className='button' onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="" id='login'><button className='button' onClick={() => loginWithRedirect()}>Log In</button></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

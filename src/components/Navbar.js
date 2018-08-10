import React from 'react';
import { NavLink } from 'react-router-dom';

//COMPONENTS
import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      {props.loggedIn
        ?
          <div>
            <NavLink to="/" exact>Home</NavLink><br/>
            <button onClick={props.handleLogout}>Log Out</button>
          </div>
        : <Login
          />
      }
    </div>
  )
}

export default Navbar;

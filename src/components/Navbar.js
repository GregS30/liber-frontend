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
            <h4>Welcome {props.username}</h4>
            <NavLink to="/" exact>Home</NavLink><br/>
            <NavLink to="/task" exact>Tasks</NavLink><br/>
            <NavLink to="/analytics" exact>Analytics</NavLink><br/>
            <NavLink to="/workflow" exact>Workflows</NavLink><br/>
            <button onClick={props.handleLogout}>Log Out</button>
          </div>
        : <Login
          />
      }
    </div>
  )
}

export default Navbar;

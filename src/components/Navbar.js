import React from 'react';
import { NavLink } from 'react-router-dom';

import Adapter from '../adapters/Adapter';

import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div className="navbar">
      {!!Adapter.getToken()
        ?
          <div>
            <h4>Welcome {props.username}</h4>
            <NavLink to="/" exact>Home</NavLink><br/>
            <NavLink to="/tasks" exact>Tasks</NavLink><br/>
            <NavLink to="/analytics" exact>Analytics</NavLink><br/>
            <NavLink to="/workflows" exact>Workflows</NavLink><br/>
            <button onClick={props.handleLogout}>Log Out</button>
          </div>
        : <Login
          />
      }
    </div>
  )
}

export default Navbar;

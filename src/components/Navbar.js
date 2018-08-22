import React from 'react';
import { NavLink } from 'react-router-dom';

import Adapter from '../adapters/Adapter';

import Login from './Login.js'

const Navbar = (props) => {

  return (
    <div>
      {!!Adapter.getToken()
        ?
          <ul className="nav-main">
            <li><NavLink className="nav-link" to="/" exact>Home</NavLink></li>
            <li><NavLink className="nav-link" to="/tasks" exact>Tasks</NavLink></li>
            <li><NavLink className="nav-link" to="/analytics" exact>Analytics</NavLink></li>
            <li><NavLink className="nav-link" to="/workflows" exact>Workflows</NavLink></li>
            <li><div className="welcome">Welcome {props.username}</div></li>
            <li><button onClick={props.handleLogout}>Log Out</button></li>
          </ul>
        : <Login
          />
      }
    </div>
  )
}

export default Navbar;

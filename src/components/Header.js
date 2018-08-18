import React from 'react';

import Navbar from '../components/Navbar.js';

const Header = (props) => {

  return (
    <header className="masthead" role="banner">
      <h1>Liber Alchemy, Inc.</h1>
        <Navbar
          handleLogout={props.handleLogout}
        />
        <h3>Welcome {props.username}</h3>
    </header>
  )
}

export default Header;

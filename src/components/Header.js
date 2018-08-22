import React from 'react';

import Navbar from '../components/Navbar.js';

const Header = (props) => {

  return (
    <header className="masthead">
      <div className="company-name">
        <h1>Liber Alchemy, Inc.</h1>
      </div>
        <Navbar
          handleLogout={props.handleLogout}
          username={props.username}
        />
    </header>
  )
}

export default Header;

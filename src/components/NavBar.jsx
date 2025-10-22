import React from 'react';
import "../styles/Home.css";
import { Link } from 'react-router-dom';
import Logout from './Logout';

function NavBar() {
  return (
    <div>
      <nav className="navbar" style={{ fontFamily: '"Press Start 2P", monospace' }}>

        <div className="logo">
          <img src="/icons/logo.png" alt="logo" className="logo-icon" />
          <span><img src="/icons/MainLogo.png" alt="webname" style={{ width: "125px", height: "50px" }} /></span>
        </div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/journey">Journey</Link>
          <Link to="/MagicHome">Manifestation</Link>
          <Link to="/books">Books</Link>
          <Link to="/taskList">To do list</Link>
          <Link to="/about">About</Link>
          <Logout />
        </div>

      </nav>
      </div>
  )
}
export default NavBar;
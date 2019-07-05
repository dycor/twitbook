import React from 'react';
import { Link } from "react-router-dom";
import style from './style.scss';

const NavBar = () => {

  return  (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>

          </ul>
        </nav>
      </div>
  );
};

export default NavBar;

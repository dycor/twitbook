import React,{useState} from 'react';
import { Link } from "react-router-dom";
import './style.scss';
import { ReactComponent as Bell } from '../../static/icons/bell.svg'
import { ReactComponent as Home } from '../../static/icons/home.svg'
import { ReactComponent as Mail } from '../../static/icons/mail.svg'
import { ReactComponent as Search } from '../../static/icons/search.svg'

const NavBar = () => {
  const [active,setActive] = useState('home');
  console.log(active)
  // console.log(style)
  return  (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"  onClick={() => setActive('home')}><Home className={'icon'+(active === 'home' ? ' active' : '')}/></Link>
            </li>
            <li>
              <Link to="/search" onClick={() => setActive('search')}><Search className={'icon'+(active === 'search' ? ' active' : '')}/></Link>
            </li>
            <li>
              <Link to="/notifications" onClick={() => setActive('notifications')}><Bell className={'icon'+(active === 'notifications' ? ' active' : '')}/></Link>
            </li>
            <li >
              <Link to="/messages" onClick={() => setActive('messages')}><Mail className={'icon'+(active === 'messages' ? ' active' : '')}/></Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default NavBar;

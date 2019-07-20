import React from 'react';
import { Link } from "react-router-dom";
import '../style.scss';
import { ReactComponent as Bell } from '../../../static/icons/bell.svg'
import { ReactComponent as Home } from '../../../static/icons/home.svg'
import { ReactComponent as Mail } from '../../../static/icons/mail.svg'
import { ReactComponent as Search } from '../../../static/icons/search.svg'
import Logout from "../UnloggedNav/Logout";

const LoggedNav = ({ user, active, setActive }) =>
    <nav>
        <ul>
          <li className={'li-navbar' + (active === 'home' ? ' active' : '')}>
            <Link to="/"  onClick={() => setActive('home')} aria-label="Accueil"><Home className={'icon'+(active === 'home' ? ' active' : '')}/>
              <p>Accueil</p>
            </Link>
          </li>
          <li className={'li-navbar' + (active === 'search' ? ' active' : '')}>
            <Link to="/search" onClick={() => setActive('search')} aria-label="Recherche"><Search className={'icon'+(active === 'search' ? ' active' : '')}/>
              <p>Rechercher</p>
            </Link>
          </li>
          <li className={'li-navbar' + (active === 'notifications' ? ' active' : '')}>
            <Link to="/notifications" onClick={() => setActive('notifications')} aria-label="Notifications"><Bell className={'icon'+(active === 'notifications' ? ' active' : '')}/>
              <p>Notifications</p>
            </Link>
          </li>
          <li className={'li-navbar' + (active === 'messages' ? ' active' : '')}>
            <Link to="/messages" onClick={() => setActive('messages')} aria-label="Messages"><Mail className={'icon'+(active === 'messages' ? ' active' : '')}/>
              <p>Messages</p>
            </Link>
          </li>
          <li>
            <Link to={`/profile/${user.username}`} onClick={() => setActive('profile')} aria-label="Profile">
              <p>Mon profil</p>
            </Link>
          </li>
          <Logout/>
        </ul>
      </nav>
  ;

export default LoggedNav;

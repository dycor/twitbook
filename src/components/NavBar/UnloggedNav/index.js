import React from 'react';
import { Link } from "react-router-dom";
import '../style.scss';
import { ReactComponent as Search } from '../../../static/icons/search.svg'

const UnloggedNav = ({active,setActive}) =>
    <nav>
      <ul>
        <li className={'li-navbar' + (active === 'search' ? ' active' : '')}>
          <Link to="/search" onClick={() => setActive('search')} aria-label="Recherche"><Search className={'icon'+(active === 'search' ? ' active' : '')}/>
            <p>Rechercher</p>
          </Link>
        </li>
        <li className={'li-navbar' + (active === 'login' ? ' active' : '')}>
          <Link to="/login" onClick={() => setActive('login')} aria-label="Notifications">
            <p>Login</p>
          </Link>
        </li>
      </ul>
    </nav>
    ;

export default UnloggedNav;

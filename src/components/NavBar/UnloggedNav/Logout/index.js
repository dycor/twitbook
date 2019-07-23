import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import {AppContext} from "../../../App/AppProvider";
import { ReactComponent as LogoutIcone } from '../../../../static/icons/logout.svg'

const Logout = () => {
  let { setUser } = useContext(AppContext);

  const onClick = () => {
    localStorage.removeItem('user');
    setUser(null);
    return <Redirect to='/'/>
  };
  return ( 
    <li className='li-navbar'>
      <a href="#" onClick={() => onClick()} aria-label="Logout">
        <LogoutIcone className='icon'/>
        <p>Logout</p> 
      </a>
    </li>
  );
};

export default Logout;
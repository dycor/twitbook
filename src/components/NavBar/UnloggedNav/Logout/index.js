import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import {AppContext} from "../../../App/AppProvider";

const Logout = () => {
  let { setUser } = useContext(AppContext);

  const onClick = () => {
    localStorage.removeItem('user');
    setUser(null);
    return <Redirect to='/'/>
  };
  return ( <button onClick={() => onClick()}>Logout</button> );
};

export default Logout;
import React,{ useState, useContext} from 'react';
import {AppContext} from "../App/AppProvider";
import LoggedNav from "./LoggedNav";
import UnloggedNav from "./UnloggedNav";

const NavBar = () => {
  const [active,setActive] = useState('home');
  const { user } = useContext(AppContext);

  return  user ? <LoggedNav user={user} active={active} setActive={setActive}/> : <UnloggedNav active={active} setActive={setActive}/>;
};

export default NavBar;

import React from 'react';
import { Route } from "react-router-dom";
import Tweets from "./components/Tweets";
import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import PrivateRoute from './helpers/private-route';


const Router = () => (
    <>
      {/*<PrivateRoute path="/logout" exact component={Logout} />*/}
      <PrivateRoute path="/" exact component={Tweets} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/profile/:username" exact component={Profile} />
    </>
  )
;

export default Router;

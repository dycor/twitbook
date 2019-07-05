import React from 'react';
import { Route } from "react-router-dom";
import Tweets from "./components/Tweets";
import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';


const Router = () => (
    <>
      {/*<PrivateRoute path="/logout" exact component={Logout} />*/}
      <Route path="/" exact component={Tweets} />
      {<Route path="/login" exact component={SignIn} />}
      <Route path="/signup" exact component={SignUp} />
    </>
  )
;

export default Router;

import React from 'react';
import { Route } from "react-router-dom";
import Tweets from "./components/Tweets";
import Comments from "./components/Comments";


const Router = () => (
    <>
      {/*<PrivateRoute path="/logout" exact component={Logout} />*/}
      <Route path="/" exact component={Tweets} />
      {/*<Route path="/login" exact component={Login} />*/}
      {/*<Route path="/signup" exact component={SignUp} />*/}
      <Route path="/comments-tmp" exact component={Comments} />
    </>
  )
;

export default Router;
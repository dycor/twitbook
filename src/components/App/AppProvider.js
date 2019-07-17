import React, { createContext, Component } from "react";
import actions from './actions';
import publicActions from '../../helpers/public-actions';
import firebase from '@firebase/app';
import '@firebase/firestore'

import config from "../../helpers/Config";

export const AppContext = createContext({});

class AppProvider extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      this.firebase = firebase.initializeApp(config);
      this.store = firebase.firestore();
    }
  }

  state = {
    user: null,
    followers : null
  };

  setUser = user => this.setState({user : user});

  setFollowers = followers => this.setState({followers : followers});

  getFirebase = () => this.firebase;
  getStore = () => this.store;

  componentDidMount(){
    const user = localStorage.getItem('user');
    if(user) this.setState({user : JSON.parse(user)});

  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
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

      this.store.enablePersistence().catch(err => {
        if (err.code === "failed-precondition") {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.error(err);
        } else if (err.code === "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.error(err);
        }
      });
    }
    const user = localStorage.getItem('user');
    const followers = localStorage.getItem('followers');

    this.state = {
      user: user ? JSON.parse(user) : null,
      followers : followers ? JSON.parse(followers) : null,
      isOffline: false
    };
  }

  setUser = user => this.setState({ user: user });

  setFollowers = followers => this.setState({ followers: followers });

  getFirebase = () => this.firebase;
  getStore = () => this.store;

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors"
        })
          .then(() => {
            this.setState({ isOffline: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => this.setState({ isOffline: true }));
      }, 2000);
      return;
    }

    return this.setState({ isOffline: true });
  };

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, ...publicActions(this, actions) }}
      >
        <div ref={elem => (this.nv = elem)}>{this.props.children}</div>
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

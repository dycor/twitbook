import React, {useContext,useState} from 'react';
import 'firebase/auth';
import { AppContext } from "../App/AppProvider";
import { Link } from "react-router-dom";
import "./signin.scss";

const SignIn  = props => {

    const { getFirebase,getStore,setFollowers,setUser } = useContext(AppContext);
    const firebase = getFirebase();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();

        if (!email || !password) {
            setErrors(['Invalid or password or email']);
        } else {
            const db = getStore();
            firebase.auth().signInWithEmailAndPassword(email, password)
              .then(response => {
                  db.collection('users').where('email', '==', email).get()
                    .then(response => {
                      const userDoc = response.docs[0];
                      const user = JSON.stringify({id:userDoc.id,...userDoc.data()});

                      localStorage.setItem('user',user );
                      setUser(JSON.parse(user));

                      db.collection('followers').where('followed', '==', userDoc.id).get().then(res => {
                        const followers = res.docs.map( follower => follower.data().follower);
                        setFollowers(followers);
                      });
                        props.history.push('/')
                    })
                  ;

              }).catch(error => setErrors([error.message]));
        }
    };

    return (
      <div className="home-content">
        <form onSubmit={handleSubmit} className="flex-content-form">
          {errors.map(error => (
            <p key={error} className="error-message">{error}</p>
          ))}
          <div className="form-group">
              <label>
                  <span>Email:</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
              </label>

              <label>
                  <span>Mot de passe:</span>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
              </label>
          </div>
          <div className="form-action">
            <input type="submit" value="Se connecter" className="submit" />
          </div>
          <div className="form-options">
            <span>Vous n'avez pas de compte ? <Link to="signup">Cliquez ici</Link></span>
          </div>
        </form>
      </div>
    );
};

export default SignIn;
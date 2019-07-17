import React, {useContext,useState} from 'react';
import 'firebase/auth';
import {AppContext} from "../App/AppProvider";

const SignIn  = props => {

    const { getFirebase,getStore } = useContext(AppContext);
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
                      console.log(response)
                        response.forEach(user => {
                            localStorage.setItem('user', JSON.stringify({id:user.id,...user.data()}));
                        });

                        props.history.push('/')
                    })
                  ;

              }).catch(error => setErrors([error.message]));
        }
    };

    return (
      <form onSubmit={handleSubmit}>
          {errors.map(error => (
            <p key={error}>{error}</p>
          ))}
          <div className="form-group">
              <label>
                  <span>Email:</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
              </label>

              <label>
                  <span>Password:</span>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
              </label>
          </div>

          <input type="submit" value="Se connecter" className="submit" />
      </form>
    );
};

export default SignIn;
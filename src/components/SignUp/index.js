import React, {useContext,useState} from 'react';
import 'firebase/auth';
import uuid from 'uuid';
import './style.scss';

import { AppContext } from "../App/AppProvider";

const SignUp = props => {
  const { getFirebase,getStore } = useContext(AppContext);
  const firebase = getFirebase();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [username,setUsername] = useState('');
  const [pseudo,setPseudo] = useState('');
  const [errors,setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!email || !password) {
      setErrors(['Email ou mot de passe invalide']);
    } else {

      const db = getStore();
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
          db.collection('users').add({
            'lastname': lastname,
            'firstname': firstname,
            'email': email,
            'pseudo': pseudo,
            'username': username,
            'userId': uuid()
          });

          props.history.push('/login')
        }).catch(error => {
        errors.push(error.message);
      })
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      {errors.map(error => (
        <p key={error}>{error}</p>
      ))}
      <div className="form-group">
        <label>
          <span>Nom:</span>
          <input type="text" value={lastname} name="firstname" onChange={e => setLastname(e.target.value)}/>
        </label>
        <label>
          <span>Prénom:</span>
          <input type="text" value={firstname} name="lastname" onChange={e => setFirstname(e.target.value)}/>
        </label>
      </div>

      <div className="form-group">
        <label>
          <span>Pseudo:</span>
          <input type="text" name="pseudo" onChange={e => setPseudo(e.target.value)} value={pseudo}/>
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Username:</span>
          <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username}/>
        </label>
      </div>

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

      <input type="submit" value="S'inscrire" className="submit" />
    </form>
  )

};

export default SignUp;
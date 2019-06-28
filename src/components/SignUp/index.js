import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import uuid from 'uuid';

import { Config } from "../../helpers/Config";
import style from './style.scss';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.config = new Config();

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            pseudo: '',
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
           [ event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        if (!this.state.email || !this.state.password) {
            this.state.errors.push('Email ou mot de passe invalide');
            return;
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(this.config.getEnv());
        }

         const db = firebase.firestore();
         firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
             .then(response => {
                 db.collection('users').add({
                    'lastname': this.state.lastname,
                    'firstname': this.state.firstname,
                    'email': this.state.email,
                    'pseudo': this.state.pseudo,
                    'userId': uuid()
                });

                 this.props.history.push('/login')
             }).catch(error => {
                 this.state.errors.push(error.message);
            })
         ;

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.errors.map(error => (
                    <p key={error}>{error}</p>
                ))}
                <div className="form-group">
                    <label>
                        <span>Nom:</span>
                        <input type="text" value={this.state.firstname} name="firstname" onChange={this.handleChange}/>
                    </label>
                    <label>
                        <span>Prénom:</span>
                        <input type="text" value={this.state.lastname} name="lastname" onChange={this.handleChange}/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        <span>Pseudo:</span>
                        <input type="text" name="pseudo" onChange={this.handleChange} value={this.state.pseudo}/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        <span>Email:</span>
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label>

                    <label>
                        <span>Password:</span>
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                    </label>
                </div>

                <input type="submit" value="S'inscrire" className="submit" />
            </form>
        )
    }
}

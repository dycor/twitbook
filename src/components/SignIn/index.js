import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Config } from "../../helpers/Config";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.config = new Config();

        this.state = {
            email: '',
            password: '',
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
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                db.collection('users').where('email', '==', this.state.email).get()
                    .then(response => {
                        response.forEach(user => {
                            localStorage.setItem('user', JSON.stringify(user.data()));
                        });

                        this.props.history.push('/')
                    })
                ;

            }).catch(error => console.error(error))
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

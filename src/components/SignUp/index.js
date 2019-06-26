import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebase_config from "../../helpers/firebase-auth";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

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

        firebase.initializeApp(firebase_config);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.errors.map(error => (
                    <p key={error}>{error}</p>
                ))}
                <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleChange} name="email" />
                </label>

                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                </label>

                <input type="submit" value="S'inscrire" />
            </form>
        )
    }
}

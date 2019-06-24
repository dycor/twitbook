import react from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class SignUp extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            auth: firebase.auth()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.email || !this.state.password) {
            this.state.errors.push('Email ou mot de passe invalide');
            return;
        }

        this.state.auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.errors.map(error => (
                    <p key={error}>{error}</p>
                ))}
                <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleChange} />
                </label>

                <label>
                    Password:
                    <input type="email" value={this.state.password} onChange={this.handleChange} />
                </label>

                <input type="submit" value="S'inscrire" />
            </form>
        )
    }
}

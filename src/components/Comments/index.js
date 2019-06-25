import React from 'react';
import { Link } from "react-router-dom";
import style from './style.scss';

const Comments = () => {
    state = {
        text: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onNew(this.state);

        return false;
    }

    return <form onSubmit={this.handleSubmit}>
        <textarea 
            value={this.state.text} 
            onChange={
                (event) => this.setState({
                    text: event.currentTarget.value
                })
            }/>
        <button type="submit">Send comment</button>
    </form>
    ;
};

export default Comments;
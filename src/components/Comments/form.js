import React from 'react';
import { Link } from "react-router-dom";
import style from './style.scss';

class PostComment extends React.Component
{
    state = {
        text: ""
    }

    handleSubmit = (event) => {
        // Fonction à définir
        /*
        event.preventDefault();
        this.props.onNew(this.state);
        */
        return false;
    }

    render() {
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
    }
};

export default PostComment;
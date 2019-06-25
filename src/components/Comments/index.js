import React from 'react';
import { Link } from "react-router-dom";
import style from './style.scss';
import PostComment from './form';

class Comments extends React.Component
{
    state = {
        text: "",
        comments: [
            {
                login: "Backin",
                content: "lorem ipsum"
            },
            {
                login: "Backin 2",
                content: "lorem ipsum"
            },
        ]
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
        return <><ul class="comments-list">
            {
                this.state.comments.map((comment) => 
                    <li>
                        Autor : {comment.login}<br/>
                        Message : {comment.content}
                        
                    </li>
                )
            }
        </ul>
        <PostComment/>
        </>
        ;
    }
};

export default Comments;
import React,{ useEffect, useState }  from 'react';
import {Link} from "react-router-dom";
import Tweet from '../Tweet';
import Tweets from '../Tweets';



const Like = ({tweetId, nbLike, addLike, removeLike, isLiked}) => {
    const [liked, setLiked]= useState(isLiked);
    const clickLike = () => {
        liked?removeLike(tweetId):addLike(tweetId);
        setLiked(!liked);
    }
    return (<span><button onClick={clickLike} >{liked?'dislike':'like'}</button>{nbLike ?nbLike :''}</span>)
};

      

export default Like;
import React,{ useEffect, useState }  from 'react';
import {Link} from "react-router-dom";
import { ReactComponent as LikeIcon } from '../../static/icons/like.svg'
import { ReactComponent as UnlikeIcon } from '../../static/icons/unlike.svg'



const Like =  ({tweetId, nbLike, addLike, removeLike, isLiked}) => {
    const [liked, setLiked]= useState(false);
    const clickLike = () => {
        liked?removeLike(tweetId):addLike(tweetId);
        setLiked(!liked);
    }

    useEffect(() => {
        isLiked(tweetId).then(doc => setLiked(doc.exists));
    }, []);
    if(liked){
        return (<span className="like"><UnlikeIcon  onClick={clickLike}></UnlikeIcon>{nbLike ?nbLike :''}</span>)
    }else{
        return (<span className="like"><LikeIcon  onClick={clickLike}></LikeIcon>{nbLike ?nbLike :''}</span>)
    }
};
      
export default Like;

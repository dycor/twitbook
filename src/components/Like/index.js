import React,{ useEffect, useState }  from 'react';
import { ReactComponent as LikeIcon } from '../../static/icons/like.svg'
import { ReactComponent as UnlikeIcon } from '../../static/icons/unlike.svg'



const Like =  ({tweetId, nbLike, addLike, removeLike, isLiked}) => {
    const [liked, setLiked]= useState(false);
    const [NbLike, setNbLike]= useState(nbLike);
    const clickLike = () => {
        liked?removeLike(tweetId):addLike(tweetId);
        liked?setNbLike(NbLike-1):setNbLike(NbLike +1);
        setLiked(!liked);
    }

    useEffect(() => {
        isLiked(tweetId).then(doc => setLiked(doc.exists));

    }, []);
    if(liked){
        return (<span class="like"><UnlikeIcon  onClick={clickLike}></UnlikeIcon><div ClassName="counter">{NbLike ?NbLike :''}</div></span>)
    }else{
        return (<span class="like"><LikeIcon  onClick={clickLike}></LikeIcon><div ClassName="counter">{NbLike ?NbLike :''}</div></span>)
    }
};
      
export default Like;

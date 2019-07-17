import {Link} from "react-router-dom";
import React, {useState} from "react";
import Like from '../Like';
import storage from 'firebase';

const Tweet = ({tweet, addLike, removeLike, isLiked, user, nbLike}) => {
 return <li id={tweet.id}>
    <img src={tweet.profilImage} className="profilImage" />
    <div>
      <h3>{tweet.pseudo}</h3>
      <Link className="username" to={`/${tweet.username}`}>@{tweet.username}</Link>
    </div>

    <p>{tweet.text} </p>
    <img src={tweet.imageUrl} alt="temp alt"></img>
    <div>
      <span><img className="icon" src="http://www.logospng.com/images/66/ajax-comment-system-for-laravel-66079.png"/>{tweet.nbComment}</span>
      <Like nbLike={nbLike} tweetId={tweet.id} addLike={addLike} user={user} removeLike={removeLike} isLiked={isLiked}></Like>
      <span><img className="icon" src="https://www.nicepng.com/png/detail/24-241083_twitter-retweet-png.png"/>{tweet.nbRetweet}</span>
    </div>
  </li>;
}

export default Tweet;
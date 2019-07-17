import {Link} from "react-router-dom";
import React, {useState} from "react";
import Like from '../Like';

const Tweet = ({tweet, addLike, removeLike, isLiked, user, nbLike}) => {
  return <li id={tweet.id} className="tweet-card">
    <div className="tweet-card--profile">
      <div className="tweet-card--profile--avatar">
        {tweet.profilImage ? <img src={tweet.profilImage} className="profilImage" alt={'Avatar profil of ' + tweet.username}/> : ''}
      </div>
      <div className="tweet-card--profile--username">
        <h3><Link className="username" to={`/${tweet.username}`}>{tweet.username}</Link></h3>
        <p>@{tweet.username}</p>
      </div>
    </div>
    <div className="tweet-card--content">
      <p>{tweet.text} </p>
    </div>
    {
      tweet.imageUrl ? 
      <div className="tweet-card--media">
        <img src={tweet.imageUrl} alt="temp alt"></img>
      </div>
      :
      ''
    }
    <div className="tweet-card--options">
      <span><img className="icon" src="http://www.logospng.com/images/66/ajax-comment-system-for-laravel-66079.png"/>{tweet.nbComment}</span>
      <Like nbLike={nbLike} tweetId={tweet.id} addLike={addLike} user={user} removeLike={removeLike} isLiked={isLiked}></Like>
      <span><img className="icon" src="https://www.nicepng.com/png/detail/24-241083_twitter-retweet-png.png"/>{tweet.nbRetweet}</span>
    </div>
  </li>;
}

export default Tweet;
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Like from '../Like';
import Retweet from '../Retweet';
import { ReactComponent as ChatIcon } from '../../static/icons/chat.svg'

const Tweet = ({tweet, addLike, removeLike, isLiked, user, NbLike, NbRetweet, retweet, unretweet, isRetweeted}) => {
  return <li id={tweet.id} className="tweet-card">
    <div className="tweet-card--profile">
      <div className="tweet-card--profile--avatar">
        {tweet.profilImage ? <img src={tweet.profilImage} className="profilImage" alt={'Avatar profil of ' + tweet.username}/> : ''}
      </div>
      <div className="tweet-card--profile--username">
        <h3><Link className="username" to={`/profile/${tweet.username}`}>{tweet.username}</Link></h3>
        <p>@{tweet.username}</p>
      </div>
    </div>
    <div className="tweet-card--content">
      <p>{tweet.text} </p>
    </div>
    {
      tweet.imageUrl ? 
      <div className="tweet-card--media">
        <img src={tweet.imageUrl} alt={`Media from : ` +tweet.username}></img>
      </div>
      :
      ''
    }
    <div className="tweet-card--options">
      <span class="like"><ChatIcon></ChatIcon>{tweet.nbComment}</span>
      <Like nbLike={NbLike} tweetId={tweet.id} addLike={addLike} user={user} removeLike={removeLike} isLiked={isLiked}></Like>
      <Retweet  nbRetweet={NbRetweet}  retweet={retweet} unretweet={unretweet} isRetweeted={isRetweeted} tweetId={tweet.id}></Retweet>
    </div>
  </li>;
}

export default Tweet;
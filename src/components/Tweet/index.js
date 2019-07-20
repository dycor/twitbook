import {Link} from "react-router-dom";
import React from "react";
import Like from '../Like';
import Retweet from '../Retweet';
import { ReactComponent as ChatIcon } from '../../static/icons/chat.svg'

const Tweet = ({tweet}) => {
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
      <span className="like"><ChatIcon></ChatIcon>{tweet.nbComment}</span>
      <Like nbLike={tweet.NbLike} tweetId={tweet.id} />
      <Retweet tweetId={tweet.id} nbRetweet={tweet.NbRetweet}/>
    </div>
  </li>;
};

export default Tweet;
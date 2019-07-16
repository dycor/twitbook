import {Link} from "react-router-dom";
import React from "react";
import Tweets from '../Tweets';
import Like from '../Like';


const Tweet = ({tweet, addLike, removeLike, isLiked, user, nbLike}) =>

  <li id={tweet.id} onClick={ e => console.log(e.target.id)}>
    <img src={tweet.profilImage} className="profilImage" />
    <div>
      <h3>{tweet.pseudo}</h3>
      <Link className="username" to={`/${tweet.username}`}>@{tweet.username}</Link>
    </div>

    <p>{tweet.text}</p>
    <div>
      <span><img className="icon" src="http://www.logospng.com/images/66/ajax-comment-system-for-laravel-66079.png"/>{tweet.nbComment}</span>
      <Like nbLike={nbLike} tweetId={tweet.id} addLike={addLike} user={user} removeLike={removeLike} isLiked={isLiked(tweet.id)}></Like>
      <span><img className="icon" src="https://www.nicepng.com/png/detail/24-241083_twitLiketer-retweet-png.png"/>{tweet.nbRetweet}</span>
    </div>
  </li>;

export default Tweet;
import {Link} from "react-router-dom";
import React from "react";

const Tweet = ({tweet}) =>
  <li id={tweet.id} onClick={ e => console.log(e.target.id)}>
    <img src={tweet.profilImage} className="profilImage" />
    <div>
      <h3>{tweet.pseudo}</h3>
      <Link className="username" to={`/${tweet.username}`}>@{tweet.username}</Link>
    </div>

    <p>{tweet.text} </p>
    <div>
      <span><img className="icon" src="http://www.logospng.com/images/66/ajax-comment-system-for-laravel-66079.png"/>{tweet.nbComment}</span>
      <span><img className="icon" src="https://previews.123rf.com/images/avectors/avectors1803/avectors180300188/98093154-heart-logo-vector-icon-isolated-modern-abstract-line-black-heart-symbol-.jpg"/>{tweet.nbLike}</span>
      <span><img className="icon" src="https://www.nicepng.com/png/detail/24-241083_twitter-retweet-png.png"/>{tweet.nbRetweet}</span>
    </div>
  </li>;

export default Tweet;
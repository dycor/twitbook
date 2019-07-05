import React,{ useState, useMemo }  from 'react';
import tweetsMock from './tweets.mock';
import './style.scss';

const Tweets = () => {

  const [tweets,setTweets] = useState(tweetsMock);
  const [loading,setLoading] = useState(false);

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    // console.log('offset = ' + offset);
    // console.log('height = ' + height);

    if (offset === height) {
      console.log('At the bottom');
      // setTweets([...tweetsMock,...tweetsMock,...tweetsMock]);
      setLoading(true);
      setTimeout(function(){
        setTweets([...tweetsMock,...tweetsMock,...tweetsMock]);
        setLoading(false);
        }, 3000);

    }
  };

  return (
    <>
      <ul className="tweetsList">
        { tweets.map( tweet =>
          <li key={Math.random()}>
            <img src={tweet.profilImage} className="profilImage" />
            <div>
              <h3>{tweet.pseudo}</h3>
              <span className="username">@{tweet.username}</span>
            </div>

            <p>{tweet.text} </p>
            <div>
              <span><img className="icon" src="http://www.logospng.com/images/66/ajax-comment-system-for-laravel-66079.png"/>{tweet.nbComment}</span>
              <span><img className="icon" src="https://previews.123rf.com/images/avectors/avectors1803/avectors180300188/98093154-heart-logo-vector-icon-isolated-modern-abstract-line-black-heart-symbol-.jpg"/>{tweet.nbLike}</span>
              <span><img className="icon" src="https://www.nicepng.com/png/detail/24-241083_twitter-retweet-png.png"/>{tweet.nbRetweet}</span>
            </div>
          </li>
        )}
      </ul>
      { loading ? <div>Waiting .... </div> : <></>}
      <div className='test'/>
    </>
  )
};

export default Tweets;
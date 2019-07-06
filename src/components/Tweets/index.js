import React,{ useState, useContext,useEffect }  from 'react';
import tweetsMock from './tweets.mock';
import './style.scss';
import {AppContext} from "../App/AppProvider";

var lastTweet;
var called = false;
const Tweets = () => {

  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newTweet,setNewTweet] = useState('');
  const { getStore,user } = useContext(AppContext);
  const store = getStore();


  //useEffect quand le composant est monté pour la première fois
  //Charger les 50 1er tweets
  //stocker le dernier tweet de ma liste
  useEffect(() => {
      if(!called){
        store.collection('tweets').orderBy('createdAt').limit(50).get().then( doc => {
          console.log(doc.docs[0].data().text)
           setTweets([...doc.docs.map(tweet => tweet.data())]);
          lastTweet = doc.docs[doc.docs.length - 1 ];
          console.log(lastTweet)
        });

        // setTweets([...tweetsMock,...tweetsMock,...tweetsMock]);
        setLoading(true);
        called = true;
      }
    }
  );
  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height) {
      setLoading(true);
      console.log('At the bottom');
      store.collection('tweets').orderBy('createdAt').startAfter(lastTweet).limit(50).get().then(doc => {
        setTweets([...tweets,...doc.docs.map(tweet => tweet.data())]);
        if(doc.docs.length)lastTweet = doc.docs[doc.docs.length - 1 ];

      });
      setLoading(false);
    }
  };

  const addTweet = () => {
    store.collection('tweets').add({
      'userId': user.userId,
      'username': user.username,
      'text': newTweet,
      'createdAt': Date.now(),
      'NbLike': 0,
      'NbRetweet': 0,
      'NbComment': 0
    });
    setNewTweet('');
  } ;

  return (
    <>
      <ul className="tweetsList">
        <div>
          <textarea rows={5} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={140}/>
          <button onClick={addTweet} className="btn-primary">Tweeter</button>
        </div>
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
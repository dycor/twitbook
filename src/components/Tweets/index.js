import React,{ useState, useContext,useEffect,useRef,useMemo }  from 'react';
import './style.scss';
import {AppContext} from "../App/AppProvider";

var lastTweet;
var indexDB ;
const Tweets = () => {

  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newTweet,setNewTweet] = useState('');
  const { getStore,user } = useContext(AppContext);
  const store = getStore();
  const ref = useRef( { mounted: false });

  useEffect(() => {
    if(!ref.current.mounted){
      setLoading(true);
      store.collection('tweets').orderBy('createdAt','desc').limit(50).get().then( doc => {
        indexDB = doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        });
        setTweets([...indexDB]);
        lastTweet = doc.docs[doc.docs.length - 1 ];
        setLoading(false);
        });
      ref.current = { mounted: true }
    }
  });

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      console.log('At the bottom');
      store.collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet).limit(50).get().then(doc => {
        indexDB = [...indexDB,...doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        })];
        setTweets(indexDB);
        if(doc.docs.length) lastTweet = doc.docs[ doc.docs.length - 1 ];
        setLoading(false);

      });

    }
  };


  const addTweet = () => {
    for (let i = 0; i < 150 ; i++) {
      setTimeout(() => {
        store.collection('tweets').add({
          'userId': user.userId,
          'username': user.username,
          'text': 'newTweet '+i,
          'createdAt': Date.now(),
          'NbLike': 0,
          'NbRetweet': 0,
          'NbComment': 0
        });
        setNewTweet('');
      }, 300);
    }

  } ;

  return <>
    {useMemo(() =>
      <div>
        <textarea rows={5} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={140}/>
        <button onClick={addTweet} className="btn-primary">Tweeter</button>
      </div>
    )}
      <ul className="tweetsList">
        { tweets.map( tweet =>
          <li key={tweet.id} id={tweet.id} onClick={ e => console.log(e.target.id)}>
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
};
//


export default Tweets;
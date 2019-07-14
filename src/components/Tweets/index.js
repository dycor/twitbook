import React,{ useState, useContext,useEffect,useRef }  from 'react';
import './style.scss';
import { AppContext } from "../App/AppProvider";
import Tweet from '../Tweet';
import NewTweet from '../Tweet/newTweet';
import Spinner from '../Spinner';

var lastTweet;
var indexDB ;

const Tweets = () => {

  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newTweet,setNewTweet] = useState('');
  const [closed,setClosed] = useState(true);
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
    const tweet = {
      'userId': user.userId,
      'username': user.username,
      'text': newTweet,
      'createdAt': Date.now(),
      'NbLike': 0,
      'NbRetweet': 0,
      'NbComment': 0
    };
    store.collection('tweets').add(tweet).then( doc => {
      indexDB = [ {...tweet, id: doc.id},...indexDB];
      setTweets(indexDB);
      });
    setNewTweet('');
    setClosed(true);

  } ;

  return <>
    {
      closed ? (
          <>
            <button onClick={() => setClosed(false)} className="btn-primary btn-tweet">+</button>
            <ul className="tweetsList">
              { tweets.map( tweet => <Tweet tweet={tweet} key={tweet.id}/>)}
            </ul>
            { loading ? <Spinner/> : <></>}
          </>):
        (<NewTweet newTweet={newTweet} addTweet={addTweet} setNewTweet={setNewTweet} setClosed={setClosed}/>)
    }
  </>
};


export default Tweets;
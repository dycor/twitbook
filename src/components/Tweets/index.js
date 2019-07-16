import React,{ useState, useContext,useEffect,useRef }  from 'react';
import './style.scss';
import { AppContext } from "../App/AppProvider";
import Tweet from '../Tweet';
import NewTweet from '../Tweet/newTweet';
import Spinner from '../Spinner';

var indexDB ;

const Tweets = () => {

  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadNewTweet,setLoadNewTweet] = useState(false);
  const [newTweet,setNewTweet] = useState('');
  const [closed,setClosed] = useState(true);
  const { getStore,user } = useContext(AppContext);
  const store = getStore();
  const ref = useRef( { mounted: false });
  const endTweet = useRef( false);
  const lastTweet = useRef( '');
  const firstTweet = useRef( '');


  useEffect(() => {
    if(!ref.current.mounted){
      setLoading(true);
      store.collection('tweets').orderBy('createdAt','desc').limit(50).get().then( doc => {
        indexDB = doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        });
        setTweets([...indexDB]);
        lastTweet.current = doc.docs[doc.docs.length - 1 ];
        firstTweet.current = doc.docs[0];
        setLoading(false);
      });
      ref.current = { mounted: true }
    }
  });

  const fetchNewtweet = () => {
    setLoadNewTweet(true);
    store.collection('tweets').orderBy('createdAt','desc').endBefore(firstTweet.current).limit(50).get().then( doc => {
      if(doc.docs.length){
        indexDB = [...doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        }),...indexDB];
        if(doc.docs.length) firstTweet.current =  doc.docs[0];
        setTweets(indexDB);
      }
      setLoadNewTweet(false);
    });
  };

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      store.collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet.current).limit(50).get().then(doc => {
        indexDB = [...indexDB,...doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        })];
        setTweets(indexDB);
        if(doc.docs.length){
          lastTweet.current = doc.docs[ doc.docs.length - 1 ];
        } else {
          endTweet.current = true;
        }
        setLoading(false);

      });

    }
  };


  const addTweet = (imageUrl, base64Image) => {
    const tweet = {
      'userId': user.userId,
      'username': user.username,
      'text': newTweet,
      'createdAt': Date.now(),
      'NbLike': 0,
      'NbRetweet': 0,
      'NbComment': 0,
      'imageUrl' : imageUrl,
      'base64Image' : base64Image
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
            { loadNewTweet ? <Spinner/> : <></>}
            <button onClick={fetchNewtweet} className="btn-primary">click</button>
            <button onClick={() => setClosed(false)} className="btn-primary btn-tweet">+</button>
            <ul className="tweetsList">
              { tweets.map( tweet => <Tweet tweet={tweet} key={tweet.id}/>)}
            </ul>
            { loading && !endTweet.current ? <Spinner/> : <></>}
          </>):
        (<NewTweet newTweet={newTweet} addTweet={addTweet} setNewTweet={setNewTweet} setClosed={setClosed}/>)
    }
  </>
};


export default Tweets;
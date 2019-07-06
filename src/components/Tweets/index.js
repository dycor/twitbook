import React,{ useState, useContext,useEffect,useRef }  from 'react';
import './style.scss';
import { AppContext } from "../App/AppProvider";
import Tweet from '../Tweet';
import NewTweet from '../Tweet/newTweet';

var lastTweet;
<<<<<<< HEAD
var indexDB ;

=======
var called = false;
var indexDB ;
>>>>>>> wip
const Tweets = () => {

  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newTweet,setNewTweet] = useState('');
  const [closed,setClosed] = useState(true);
  const { getStore,user } = useContext(AppContext);
  const store = getStore();
  const ref = useRef( { mounted: false });

<<<<<<< HEAD
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
=======

  //Gérer le cas ou il y'a aucun tweet
  useEffect(() => {
    setLoading(true);
    if(!called){
        store.collection('tweets').orderBy('createdAt').limit(50).get().then( doc => {
          indexDB = doc.docs.map(tweet => tweet.data());
          setTweets([...indexDB]);
          lastTweet = doc.docs[doc.docs.length - 1 ];
          setLoading(false);

        });
        called = true;
      }
    }
  );
>>>>>>> wip

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      console.log('At the bottom');
<<<<<<< HEAD
      store.collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet).limit(50).get().then(doc => {
        indexDB = [...indexDB,...doc.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        })];
=======
      store.collection('tweets').orderBy('createdAt').startAfter(lastTweet).limit(50).get().then(doc => {
        indexDB = [...indexDB,...doc.docs.map(tweet => tweet.data())]
>>>>>>> wip
        setTweets(indexDB);
        if(doc.docs.length) lastTweet = doc.docs[ doc.docs.length - 1 ];
        setLoading(false);

      });

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
    setClosed(true);

  } ;

  return <>
    {
      closed ? (
          <>
            <button onClick={() => setClosed(false)} className="btn-primary">Tweeter</button>
            <ul className="tweetsList">
              { tweets.map( tweet => <Tweet tweet={tweet} key={tweet.id}/>)}
            </ul>
            { loading ? <div>Waiting .... </div> : <></>})
          </>):
        (<NewTweet newTweet={newTweet} addTweet={addTweet} setNewTweet={setNewTweet} setClosed={setClosed}/>)
    }
  </>
};


export default Tweets;

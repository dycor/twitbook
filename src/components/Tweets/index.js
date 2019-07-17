import React,{ useState, useContext,useEffect,useRef }  from 'react';
import './style.scss';
import { AppContext } from "../App/AppProvider";
import Tweet from '../Tweet';
import NewTweet from '../Tweet/newTweet';
import Spinner from '../Spinner';

var indexDB ;
const idUser = 'CS4ktupxvRaoJqESQRw6';

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
  const limit = 50;


  useEffect(() => {
    if(!ref.current.mounted){
      setLoading(true);
      store.collection('feed').doc(idUser).collection('tweets').orderBy('createdAt','desc').limit(limit).get().then( allDocs => {
        var userTweets = [];
        Promise.all(allDocs.docs.map(doc => {
          const path = doc.data().path;
          return store.doc(path).get().then( tweet => userTweets.push({...tweet.data(), id: tweet.id}));
        })).then(() => {
          indexDB = userTweets;
          setTweets(indexDB);
          lastTweet.current = allDocs.docs[allDocs.docs.length - 1 ];
          firstTweet.current = allDocs.docs[0];
          setLoading(false);
        })
      });

      ref.current = { mounted: true };
    }
  });

  const fetchNewtweet = () => {
    setLoadNewTweet(true)  ;

    store.collection('feed').doc(idUser).collection('tweets').orderBy('createdAt','desc').endBefore(firstTweet.current).limit(limit).get().then( allDocs => {
      if(allDocs.docs.length){
        var userTweets = [];
        Promise.all(allDocs.docs.map(doc => {
          const path = doc.data().path;
          return store.doc(path).get().then( tweet => userTweets.push({...tweet.data(), id: tweet.id}));
        })).then(() => {
          indexDB = [...userTweets,...indexDB];
          if(allDocs.docs.length) firstTweet.current =  allDocs.docs[0];
          setTweets(indexDB);
          setLoadNewTweet(false);
        })
      } else {
        setLoadNewTweet(false);
      }
    });

  };

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      store.collection('feed').doc(idUser).collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet.current).limit(limit).get().then( allDocs => {
        var userTweets = [];
        Promise.all(allDocs.docs.map(doc => {
          const path = doc.data().path;
          return store.doc(path).get().then( tweet => userTweets.push({...tweet.data(), id: tweet.id}));
        })).then(() => {
          indexDB = [...indexDB,...userTweets];
          setTweets(indexDB);

          if(allDocs.docs.length){
            lastTweet.current = allDocs.docs[ allDocs.docs.length - 1 ];
          } else {
            endTweet.current = true;
          }
          setLoading(false);


        })
      });

    }
  };


  const addTweet = (imageUrl, base64Image) => {

    const createdAt =  Date.now();
    const tweet = {
      'userId': user.userId,
      'username': user.username,
      'text': newTweet,
      createdAt,
      'NbLike': 0,
      'NbRetweet': 0,
      'NbComment': 0,
      'imageUrl' : imageUrl,
      'base64Image' : base64Image
    };

    store.collection('tweets').add(tweet).then( doc => {

      //Refacto
      //Ensuite rajouter pour tous les users dont je suis abonnées
      store.collection('feed').doc(idUser).collection('tweets').add({path :`tweets/${doc.id}`,retweet: false,createdAt});
      fetchNewtweet();

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
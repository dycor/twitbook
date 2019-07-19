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
  const { getStore,user,followers } = useContext(AppContext);
  const store = getStore();
  const ref = useRef( { mounted: false });
  const endTweet = useRef( false);
  const lastTweet = useRef( '');
  const firstTweet = useRef( '');
  const limit = 50;


  useEffect(() => {
    if(!ref.current.mounted && user){
      setLoading(true);
      store.collection('feed').doc(user.id).collection('tweets').orderBy('createdAt','desc').limit(limit).get().then( allDocs => {
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

    store.collection('feed').doc(user.id).collection('tweets').orderBy('createdAt','desc').endBefore(firstTweet.current).limit(limit).get().then( allDocs => {
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
      store.collection('feed').doc(user.id).collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet.current).limit(limit).get().then( allDocs => {
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
      followers.forEach(userId => {
        store.collection('feed').doc(userId).collection('tweets').add({path :`tweets/${doc.id}`,retweet: false,createdAt});
      });
      store.collection('feed').doc(user.id).collection('tweets').add({path :`tweets/${doc.id}`,retweet: false,createdAt});

      fetchNewtweet();
    });
    setNewTweet('');
    setClosed(true);

  };

  function retweet(tweetId){
    const createdAt =  Date.now();
    store.collection('retweets').doc(user.userId + "_" + tweetId).set({
      'userId': user.userId,
      'tweetId': tweetId,
    }).then( doc =>{
      followers.forEach(userId => {
        store.collection('feed').doc(userId).collection('tweets').add({path :`tweets/${tweetId}`,retweet: true,createdAt});
      });
      store.collection('feed').doc(user.id).collection('tweets').where('path', '==', 'tweets/'+tweetId).get().then(res => {
        res.forEach(doc => {
          store.collection('feed').doc(user.id).collection('tweets').doc(doc.id).update({retweet: true});
        });
      })
      fetchNewtweet();
    });
  }

  function unRetweet(tweetId){
    const createdAt =  Date.now();
    store.collection('retweets').doc(user.userId + "_" + tweetId).delete().then( doc =>{
      followers.forEach(userId => {
        store.collection('feed').doc(userId).collection('tweets').add({path :`tweets/${tweetId}`,retweet: false,createdAt});
      });
      store.collection('feed').doc(user.id).collection('tweets').where('path', '==', 'tweets/'+tweetId).get().then(res => {
        res.forEach(doc => {
          store.collection('feed').doc(user.id).collection('tweets').doc(doc.id).update({retweet: false});
        });
      })
      fetchNewtweet();
    });
  }

  function addLike(tweetId){
    store.collection('likes').doc(user.userId + "_" + tweetId).set({
      'userId': user.userId,
      'tweetId': tweetId,
    });
    let tweetRef = store.collection('tweets').doc(tweetId);
    tweetRef.get()
    .then(doc => {
        tweetRef.update({
          NbLike: doc.data().NbLike +1
        });
    })
    .catch(err => {
    })
  }

function removeLike(tweetId) {
  store.collection('likes').doc(user.userId + "_" + tweetId).delete().then(e => {
    let tweetRef = store.collection('tweets').doc(tweetId);
    let tweet = tweetRef.get()
    .then(doc => {
        tweetRef.update({
          NbLike: doc.data().NbLike -1
        });
    })
    .catch(err => {
    });
  })
  .catch(err => {
  });
}

  async function isLiked(tweetId) {
    try {
      if (user) return await store.collection("likes").doc(user.userId + "_" + tweetId).get();
    } catch (err) {
    }
  }

  async function isRetweeted(tweetId) {
    try {
      if (user) return await store.collection("retweets").doc(user.userId + "_" + tweetId).get();
    } catch (err) {
    }
  }

  return <>
    {
      closed ? (
          <>
            <div className="home-content">
              { loadNewTweet ? <Spinner/> : <></>}
              <div className="home-content--tweetlist-options">
              <button onClick={fetchNewtweet} className="btn-primary btn-reload" title="Charger de nouveaux Tweetbooks">Recharger</button>
              </div>
              <a href="#" onClick={() => setClosed(false)} className="tweetbook-add-message">
                <div className="inner">
                  <p className="visible-message">+</p>
                  <p className="hidden-message">Twitbookez</p>
                </div>
              </a>
              <ul className="tweetsList">
              { tweets.map( tweet => <Tweet tweet={tweet} nbLike={tweet.nbLike} tweetId={tweet.id} addLike={addLike} user={user} removeLike={removeLike} isLiked={isLiked} retweet={retweet} unretweet={unRetweet} isRetweeted={isRetweeted}/>)}
              </ul>
              { loading && !endTweet.current ? <Spinner/> : <></>}
            </div>
          </>):
        (<NewTweet newTweet={newTweet} addTweet={addTweet} setNewTweet={setNewTweet} setClosed={setClosed}/>)
    }
  </>
};


export default Tweets;
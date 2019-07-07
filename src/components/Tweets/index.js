<<<<<<< HEAD
import React,{ useState, useContext,useEffect,useRef }  from 'react';
=======
import React,{ useState, useContext,useEffect,useRef,useMemo }  from 'react';
import tweetsMock from './tweets.mock';
>>>>>>> tkt presque fini
import './style.scss';
import { AppContext } from "../App/AppProvider";
import Tweet from '../Tweet';
import NewTweet from '../Tweet/newTweet';

var lastTweet;
<<<<<<< HEAD
<<<<<<< HEAD
var indexDB ;

=======
var called = false;
=======
>>>>>>> tkt presque fini
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
=======
>>>>>>> tkt presque fini

  //Gérer le cas ou il y'a aucun tweet
  useEffect(() => {
    if(!ref.current.mounted){
      setLoading(true);
      store.collection('tweets').orderBy('createdAt','desc').limit(50).get().then( doc => {
          indexDB = doc.docs.map(tweet => tweet.data());
          setTweets([...indexDB]);
          lastTweet = doc.docs[doc.docs.length - 1 ];
          setLoading(false);

        });
      ref.current = { mounted: true }
    }
<<<<<<< HEAD
  );
>>>>>>> wip
=======
  });
>>>>>>> tkt presque fini

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

<<<<<<< HEAD
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
=======
    console.log(offset,height)
    if (offset === height) {
      setLoading(true);
      console.log('At the bottom');
      store.collection('tweets').orderBy('createdAt','desc').startAfter(lastTweet).limit(50).get().then(doc => {
        indexDB = [...indexDB,...doc.docs.map(tweet => tweet.data())];
>>>>>>> tkt presque fini
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
<<<<<<< HEAD
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
=======
    {useMemo(() =>
      <div>
        <textarea rows={5} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={140}/>
        <button onClick={addTweet} className="btn-primary">Tweeter</button>
      </div>
    )}
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
>>>>>>> tkt presque fini
};
//
// return useMemo(() => <ul>
//   {
//     context.todos.map(todo => <TodoItem
//       key={todo.text}
//       todo={todo}
//     />)
//   }
// </ul>, [context.todos]);



export default Tweets;

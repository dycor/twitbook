import React,{ useState, useContext } from 'react';
import { AppContext } from "../App/AppProvider";
import Tweet from "../Tweet";
import Spinner from "../Spinner";
import './style.scss'

const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [tweets,setTweets] = useState([]);
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [displayTweets,setDisplayTweets] = useState(true);
  const { getStore } = useContext(AppContext);
  const store = getStore();

  const submitSearch = async () => {
    setLoading(true);
    await Promise.all([
      store.collection('tweets')
        .where('text', '==',searchTerm )
        .get().then( allDocs => {
        const tweetsRes = allDocs.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        });
        setTweets(tweetsRes);
      }),
      store.collection('users')
        .where('username', '==',searchTerm )
        .get().then( allDocs => {
        const usersRes = allDocs.docs.map(user => {
          return {...user.data(), id: user.id};
        });
        setUsers(usersRes);
      })
    ]);
    setLoading(false);

  };

  return <div className="search-content">
    <h1>Search</h1>
    <div>
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={submitSearch}><span role="img" aria-label="search">🔍</span></button>
    </div>
    <div className="menu">
      <span className={displayTweets ? 'active' : '' } onClick={() => setDisplayTweets(true)}> Tweets</span>
      <span className={!displayTweets ? 'active' : '' } onClick={() => setDisplayTweets(false)}> Utilisateurs</span>
    </div>
    {
      loading ?
        <Spinner/>:
        <>
          {
            displayTweets ?
              <ul className="tweetsList">
                {tweets.map(tweet => <Tweet key={Math.random()} tweet={tweet}/>)}
              </ul>
              :
              <ul className="usersList">
              {users.map(user =>
                  <div key={Math.random()}>
                    <div className="user-card">
                      <img/>
                      <span>{user.pseudo}</span>
                      <span>{user.username}</span>
                      <span>{user.nbFolloweds}</span>
                      <span>{user.nbFollowers}</span>
                    </div>

                  </div>)
              }

            </ul>
          }

        </>
    }



  </div> ;
};

export default Search;
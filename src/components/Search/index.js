import React,{ useState, useContext } from 'react';
import { AppContext } from "../App/AppProvider";
import { Link } from "react-router-dom";
import Tweet from "../Tweet";
import Spinner from "../Spinner";
import './style.scss';
import { ReactComponent as SearchIcon } from '../../static/icons/search.svg';

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
    <h1>Recherche</h1>
    <div className="search-content-form">
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)} placeholder="Rechercher un Tweet ou une personne"/>
      <button onClick={submitSearch}><SearchIcon className="icon-search"/></button>
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
                <Link to={`/profile/${user.username}`} aria-label={`${user.username}'s profile`} className="user-card">
                  <div key={Math.random()}>
                    <div className="user-card-content">
                      <img/>
                      <div className="user-card-content-info">
                        <div className="login">
                          <span>{user.pseudo}</span>
                          <span>@{user.username}</span>
                        </div>
                        <div className="follow">
                          <span>{user.nbFolloweds} Followed</span>
                          <span>{user.nbFollowers} Followers</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
                )
              }

            </ul>
          }

        </>
    }



  </div> ;
};

export default Search;

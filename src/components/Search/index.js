import React,{ useState, useContext } from 'react';
import { AppContext } from "../App/AppProvider";

const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [tweets,setTweets] = useState([]);
  const { getStore } = useContext(AppContext);
  const store = getStore();

  const submitSearch = () => {
    store.collection('tweets')
      .where('text', '==',searchTerm)
      .get().then( allDocs => {
        const tweetsRes = allDocs.docs.map(tweet => {
          return {...tweet.data(), id: tweet.id};
        });
      setTweets(tweetsRes)
      console.log(tweetsRes)
    });
  };

  return <>
    <h1>Search</h1>
    <div>
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={submitSearch}>🔍</button>
    </div>
    {tweets.map(tweet => <div>
      {JSON.stringify(tweet)}
    </div> )}

  </> ;
};

export default Search;
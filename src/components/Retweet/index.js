import React,{ useEffect, useState }  from 'react';
import { ReactComponent as RetweetIcon } from '../../static/icons/retweet.svg'
import { ReactComponent as UnRetweetIcon } from '../../static/icons/unretweet.svg'


const Retweet =  ({tweetId, nbTweet, retweet, unretweet, isRetweeted}) => {
    const [retweeted, setRetweeted]= useState(false);
    const clickRetweet = () => {
        retweeted?unretweet(tweetId):retweet(tweetId);
        setRetweeted(!retweeted);
    }

    useEffect(() => {
        isRetweeted(tweetId).then(doc => setRetweeted(doc.exists));
    }, []);
    if(retweeted){
        return (<span className="like"><UnRetweetIcon  onClick={clickRetweet}></UnRetweetIcon>{nbTweet ?nbTweet :''}</span>)
    }else{
        return (<span className="like"><RetweetIcon  onClick={clickRetweet}></RetweetIcon>{nbTweet ?nbTweet :''}</span>)
    }
};

      
export default Retweet;

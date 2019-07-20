import React,{ useEffect, useState }  from 'react';
import { ReactComponent as RetweetIcon } from '../../static/icons/retweet.svg'
import { ReactComponent as UnRetweetIcon } from '../../static/icons/unretweet.svg'


const Retweet =  ({tweetId, retweet, nbRetweet, unretweet, isRetweeted}) => {
    const [retweeted, setRetweeted]= useState(false);
    const [NbRetweet, setNbRetweet]= useState(nbRetweet);
    const clickRetweet = () => {
        retweeted?unretweet(tweetId):retweet(tweetId);
        retweeted?setNbRetweet(NbRetweet-1):setNbRetweet(NbRetweet+1);
        setRetweeted(!retweeted);
    }

    useEffect(() => {
        isRetweeted(tweetId).then(doc => setRetweeted(doc.exists));
    }, []);
    if(retweeted){
        return (<span class="like"><UnRetweetIcon  onClick={clickRetweet}></UnRetweetIcon><div ClassName="counter">{NbRetweet ?NbRetweet :''}</div></span>)
    }else{
        return (<span class="like"><RetweetIcon  onClick={clickRetweet}></RetweetIcon><div ClassName="counter">{NbRetweet ?NbRetweet :''}</div></span>)

    }
};

      
export default Retweet;

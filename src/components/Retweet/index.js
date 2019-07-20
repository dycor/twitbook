import React,{ useEffect, useState, useContext }  from 'react';
import { ReactComponent as RetweetIcon } from '../../static/icons/retweet.svg'
import { ReactComponent as UnRetweetIcon } from '../../static/icons/unretweet.svg'
import {AppContext} from "../App/AppProvider";


const Retweet =  ({tweetId, nbRetweet, retnnweet, unretwneet, isRetweetedN}) => {
    const { getStore, user, followers } = useContext(AppContext);
    const store = getStore();

    const isRetweeted = async tweetId  =>{
        try {
            if (user) return await store.collection("retweets").doc(user.userId + "_" + tweetId).get();
        } catch (err) {
        }
    };

    const unRetweet = tweetId => {
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
        });
    };

    const retweet = tweetId => {
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
        });
    }


    const [retweeted, setRetweeted]= useState(false);
    const clickRetweet = () => {
        retweeted?unRetweet(tweetId):retweet(tweetId);
        setRetweeted(!retweeted);
    };

    useEffect(() => {
        isRetweeted(tweetId).then(doc => setRetweeted(doc.exists));
    }, []);

    return retweeted ?
    <span className="like"><UnRetweetIcon  onClick={clickRetweet}></UnRetweetIcon>{nbRetweet ?nbRetweet :''}</span>
    :<span className="like"><RetweetIcon  onClick={clickRetweet}></RetweetIcon>{nbRetweet ?nbRetweet :''}</span>

};

      
export default Retweet;

import React,{ useEffect, useState, useContext }  from 'react';
import { ReactComponent as RetweetIcon } from '../../static/icons/retweet.svg'
import { ReactComponent as UnRetweetIcon } from '../../static/icons/unretweet.svg'
import {AppContext} from "../App/AppProvider";


const Retweet =  ({tweetId, nbRetweet}) => {
    const { getStore, user, followers } = useContext(AppContext);
    const [retweeted, setRetweeted]= useState(false);
    const [countRetweet, setCountRetweet]= useState(nbRetweet);

    const store = getStore();

    const isRetweeted = async tweetId  =>{
        try {
            if (user) return await store.collection("retweets").doc(user.userId + "_" + tweetId).get();
        } catch (err) {
        }
    };

    const unRetweet = tweetId => {
        const createdAt =  Date.now();
        store.collection('retweets').doc(user.userId + "_" + tweetId).delete().then( () =>{
            followers.forEach(userId => {
                store.collection('feed').doc(userId)
                  .collection('tweets')
                  .add({path :`tweets/${tweetId}`,retweet: false,createdAt});
            });
            store.collection('feed').doc(user.id)
              .collection('tweets')
              .where('path', '==', 'tweets/'+tweetId)
              .get().then(res => {
                res.forEach(doc => {
                    store.collection('feed').doc(user.id).collection('tweets').doc(doc.id).update({retweet: false});
                });
                const tweetRef = store.collection('tweets').doc(tweetId);
                tweetRef.get()
                  .then(doc => {
                      tweetRef.update({
                          NbRetweet: doc.data().NbRetweet - 1
                      }).then(() => setCountRetweet(countRetweet - 1));
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
                store.collection('feed').doc(userId)
                  .collection('tweets')
                  .add({path :`tweets/${tweetId}`,retweet: true,createdAt});
            });
            store.collection('feed').doc(user.id)
              .collection('tweets')
              .where('path', '==', 'tweets/'+tweetId).get()
              .then(res => {
                res.forEach(doc => {
                    store.collection('feed').doc(user.id)
                      .collection('tweets')
                      .doc(doc.id).update({retweet: true});
                });
            });
            const tweetRef = store.collection('tweets').doc(tweetId);
            tweetRef.get()
              .then(doc => {
                  tweetRef.update({
                      NbRetweet: doc.data().NbRetweet + 1
                  }).then(() => setCountRetweet(countRetweet + 1));
              });
        });
    };


    const clickRetweet = () => {
        retweeted?unRetweet(tweetId):retweet(tweetId);
        setRetweeted(!retweeted);
    };

    useEffect(() => {
        isRetweeted(tweetId).then(doc => { if (doc) return setRetweeted(doc.exists)});
    }, [isRetweeted, tweetId]);

    return retweeted ?
    <span className="like"><UnRetweetIcon  onClick={clickRetweet}></UnRetweetIcon>{countRetweet ?countRetweet :''}</span>
    :<span className="like"><RetweetIcon  onClick={clickRetweet}></RetweetIcon>{countRetweet ?countRetweet :''}</span>

};


export default Retweet;

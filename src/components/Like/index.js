import React,{ useEffect, useState, useContext }  from 'react';
import { ReactComponent as LikeIcon } from '../../static/icons/like.svg'
import { ReactComponent as UnlikeIcon } from '../../static/icons/unlike.svg'
import {AppContext} from "../App/AppProvider";



const Like =  ({tweetId, nbLike}) => {
    const { getStore, user } = useContext(AppContext);
    const store = getStore();
    const [liked, setLiked]= useState(false);
    const [countLike, setCountlike]= useState(nbLike);


    useEffect(() => {
        isLiked(tweetId).then(doc => { if (doc) return setLiked(doc.exists)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tweetId]);

    const addLike = tweetId => {
        store.collection('likes').doc(user.userId + "_" + tweetId).set({
            'userId': user.userId,
            'tweetId': tweetId,
        });
        let tweetRef = store.collection('tweets').doc(tweetId);
        tweetRef.get()
          .then(doc => {
              tweetRef.update({
                  NbLike: doc.data().NbLike +1
              }).then(() => setCountlike(countLike + 1));
          });
    };

    const removeLike = tweetId => {
        store.collection('likes').doc(user.userId + "_" + tweetId).delete().then(e => {
            let tweetRef = store.collection('tweets').doc(tweetId);
            tweetRef.get()
              .then(doc => {
                  tweetRef.update({
                      NbLike: doc.data().NbLike -1
                  }).then(() => setCountlike(countLike - 1));
              });
        });
    };

    const isLiked = async tweetId => {
        try {
            if (user) return await store.collection("likes").doc(user.userId + "_" + tweetId).get();
        } catch (err) {
        }
    };

    const clickLike = () => {
        liked ? removeLike(tweetId) : addLike(tweetId);
        setLiked(!liked);
    };


    return liked ?
      <span className="like"><UnlikeIcon  onClick={clickLike}></UnlikeIcon>{countLike ?countLike :''}</span>
    :
      <span className="like"><LikeIcon  onClick={clickLike}></LikeIcon>{countLike ?countLike :''}</span>

};

export default Like;

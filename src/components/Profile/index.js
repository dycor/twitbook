import React, { useContext,useState,useEffect,useRef } from 'react';
import {AppContext} from "../App/AppProvider";
import Spinner from "../Spinner";
import './style.scss';
import Tweets from "../Tweets";
import Tweet from "../Tweet";

const Profile = ({ match }) => {
  const { getStore,user } = useContext(AppContext);
  const [followed,setFollowed] = useState(false);
  const [loading,setLoading] = useState(false);
  const [profile,setProfile] = useState(null);
  const [displayTweets,setDisplayTweets] = useState(true);
  const [tweetsLiked,setTweetsLiked] = useState([]);
  const store = getStore();
  const ref = useRef( { mounted: false });
  const style = {color:'white'};

  useEffect(() => {
    if(!ref.current.mounted){
      store.collection('users').where('username', '==', match.params.username).get().then( res => {
        if(res.docs.length){
          setProfile({id:res.docs[0].id,...res.docs[0].data()});
        }
      });
      if(profile && user ){
        store.collection('followers').where('follower', '==', user.id).where('followed', '==', profile.id).get().then( doc => {
          if(doc.docs.length) setFollowed(true);
          ref.current = { mounted: true };
        });
      }

    }
  });
  const follow = () => {
    if(followed) {
      store.collection('followers').where('follower', '==', user.id).where('followed', '==', profile.id).get().then( doc => {
        setFollowed(false);
        doc.docs[0].ref.delete();

        const followerRef = store.collection('users').doc(user.id);
        followerRef.get()
          .then(doc => {
            followerRef.update({
              nbFolloweds: doc.data().nbFolloweds -1
            });
          });

        const followedRef = store.collection('users').doc(profile.id);
        followedRef.get()
          .then(doc => {

            followedRef.update({
              nbFollowers: doc.data().nbFollowers -1
            }).then(() => setProfile({...profile , nbFollowers : profile.nbFollowers - 1}));
          });
      });
    } else {
      store.collection('followers').add({follower: user.id , followed: profile.id}).then( doc => {
        const followerRef = store.collection('users').doc(user.id);
        followerRef.get()
          .then(doc => {
            followerRef.update({
              nbFolloweds: doc.data().nbFolloweds + 1
            });
          });

        const followedRef = store.collection('users').doc(profile.id);
        followedRef.get()
          .then(doc => {

            followedRef.update({
              nbFollowers: doc.data().nbFollowers + 1
            }).then(() => setProfile({...profile , nbFollowers : profile.nbFollowers + 1}));
          });
        setFollowed(true);
      });
    }
  };

  const fetchTweetLiked = () => {
    setDisplayTweets(false);
    setLoading(true);
    store.collection('likes').where('userId', '==', profile.userId).get().then( doc => {
      if(doc.docs.length){
        var userTweets = [];
        Promise.all(doc.docs.map(docLike => {
          const path = 'tweets/'+docLike.data().tweetId;
          return store.doc(path).get().then( tweet => userTweets.push({...tweet.data(), id: tweet.id}));
        })).then(() => {
          setTweetsLiked(userTweets);
          setLoading(false);
        })
      } else {
        setLoading(false);
      }
    });
  };

  console.log(profile);


  return profile ? <>
    <div className="component-profile">
      <header>
        <div className="profile-header">
          {profile.image ? <img src={profile.image}/> : <img />}
          <div className="profile-name">
            <p className="name">{profile.pseudo}</p>
            <p className="twitbook-tag">@{profile.username}</p>
            <div className="follow-section">
              <span>{profile.nbFolloweds} abonnements</span>
              <span>{profile.nbFollowers} abonnés</span>
            </div>
            { user && user.id !== profile.id ?<button onClick={follow} style={style} className="btn-primary twitbook-follow">{followed ? 'Ne plus suivre':'Suivre'}</button> : <></>}
          </div>
        </div>
      </header>
      <section className="bar">
        <span className={displayTweets ? 'active' : '' } onClick={() => setDisplayTweets(true)}>Tweets</span>
        <span className={!displayTweets ? 'active' : '' } onClick={() => fetchTweetLiked()}>J'aime</span>
      </section>
      {loading ? <Spinner/> :<></>}
      {displayTweets ?
        <Tweets profile={profile}/>
        : <ul className="tweetsList">{tweetsLiked.map(tweet => <Tweet tweet={tweet} key={Math.random()} />) }</ul>
      }
    </div>
  </> : <Spinner/>
};

export default Profile;

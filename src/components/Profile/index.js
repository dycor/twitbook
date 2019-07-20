import React, { useContext,useState,useEffect,useRef } from 'react';
import {AppContext} from "../App/AppProvider";
import Spinner from "../Spinner";
import './style.scss';

const Profile = ({ match }) => {
  const { getStore,user } = useContext(AppContext);
  const [followed,setFollowed] = useState(false);
  const [profile,setProfile] = useState('');
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
      });
    } else {
      store.collection('followers').add({follower: user.id , followed: profile.id}).then( doc => {
        setFollowed(true);
      });
    }
  };

  return profile ? <>
    <div className="component-profile">
      <header>
        <div className="profile-header">
          <img />
          <div className="profile-name">
            <p className="name">{profile.pseudo}</p>
            <p className="twitbook-tag">@{profile.username}</p>
            { user.id !== profile.id ?<button onClick={follow} style={style} className="btn-primary twitbook-follow">{followed ? 'Ne plus suivre':'Suivre'}</button> : <></>}
          </div>
        </div>
      </header>
      <section>
        <span>Tweets</span>
        <span>J'aime</span>
      </section>
    </div>
  </> : <Spinner/>
};

export default Profile;

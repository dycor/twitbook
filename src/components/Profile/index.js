import React, { useContext,useState,useEffect,useRef } from 'react';
import {AppContext} from "../App/AppProvider";
import Spinner from "../Spinner";

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
          console.log(doc)
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
        console.log(doc)
      });
    } else {
      store.collection('followers').add({follower: user.id , followed: profile.id}).then( doc => {
        setFollowed(true);
      });
    }
  };

  return profile ? <>
    <div className="ProfileHeader">
      <img/>
      <span>{profile.pseudo}</span>
      <span>@{profile.username}</span>
      <button onClick={follow} style={style}>{followed ? 'Abonné':'Suivre'}</button>
    </div>
    <div>
      <span>Tweets</span>
      <span>J'aime</span>
    </div>
  </> : <Spinner/>
};

export default Profile;

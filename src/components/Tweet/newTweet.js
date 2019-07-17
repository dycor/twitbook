import React, {useState} from "react";
import ImageUpload from "../ImageUpload";

const NewTweet = ({newTweet , addTweet, setNewTweet, setClosed}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [base64Image, setBase64Image] = useState('');



  return <div className="add-tweet-component">
    <div className="form-container">
      <div className="options">
        <button onClick={() => setClosed(true)} className="btn-primary btn-twitbook-button">Retour</button>
      </div>
      <div className="form">
        <textarea rows={10} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={280}/>
        <ImageUpload setImageUrl={setImageUrl} setBase64Image={setBase64Image}/>
      </div>
      <div className="submit">
        <button onClick={() => addTweet(imageUrl, base64Image)} className="btn-primary">Tweeter</button>
      </div>
    </div>
  </div>
}

export default NewTweet;
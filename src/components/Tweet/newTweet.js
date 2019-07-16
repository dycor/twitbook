import React, {useState} from "react";
import ImageUpload from "../ImageUpload";

const NewTweet = ({newTweet , addTweet, setNewTweet, setClosed}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [base64Image, setBase64Image] = useState('');



  return <div>
    <button onClick={() => setClosed(true)} className="btn-primary">Close</button>
    <textarea rows={5} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={140}/>
    <button onClick={() => addTweet(imageUrl, base64Image)} className="btn-primary">Tweeter</button>
    <ImageUpload setImageUrl={setImageUrl} setBase64Image={setBase64Image}/>
  </div>
}

export default NewTweet;
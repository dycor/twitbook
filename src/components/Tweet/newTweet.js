import React from "react";

const NewTweet = ({newTweet , addTweet, setNewTweet, setClosed}) =>
    <div>
      <button onClick={() => setClosed(true)} className="btn-primary">Close</button>
      <textarea rows={5} cols={35} value={newTweet} onChange={e => setNewTweet(e.target.value)} maxLength={140}/>
      <button onClick={addTweet} className="btn-primary">Tweeter</button>
    </div>

export default NewTweet;
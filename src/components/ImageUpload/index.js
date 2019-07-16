import React from 'react';
import firebase from 'firebase';

const ImageUpload = ({setImageUrl , setBase64Image}) => {

  const handleChange = e => {
    const file = e.target.files[0];
    const ref = firebase.storage().ref();
    
    const name = (+new Date()) + '-' + file.name;
    const dirFolder = 'tweets/';
    const path = dirFolder + name;
    
    const task = ref.child(path).put(file);

    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        document.querySelector('#uploaded-img').src = downloadURL;
        setImageUrl(downloadURL);
        setBase64Image('nobase64now');
      });
    })/*.catch((error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    })*/;
  }
  
  return <div className="component-upload-image">
        <img id="uploaded-img" width="50%"/>
        <label>Ajouter une image</label>
        <input type="file" onChange={handleChange}/>
      </div>
}

export default ImageUpload;
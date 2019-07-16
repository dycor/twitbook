import React from 'react';
import firebase from 'firebase';

class ImageUpload extends React.Component{

  state = {
    file : null
  };

  handleSubmit = e => {
    e.preventDefault();
    return false;
  };

  handleChange = e => {
    const file = e.target.files[0];
    const ref = firebase.storage().ref();
    
    const name = (+new Date()) + '-' + file.name;
    const dirFolder = 'tweets/';
    const path = dirFolder + name;
    
    const task = ref.child(path).put(file);

    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        document.querySelector('#uploaded-img').src = downloadURL;
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

  render(){
    return <div class="component-upload-image">
        <img id="uploaded-img" width="50%"/>
        <form onSubmit={this.handleSubmit}>
          <label for="add-image">Ajouter une image</label>
          <input name="add-image" type="file" onChange={this.handleChange}/>
      </form>
      </div>
  }
}

export default ImageUpload;
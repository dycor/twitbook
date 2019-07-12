import React from 'react';

class ImageUpload extends React.Component{

  state = {
    file : null
  };

  handleSubmit = e => {
    e.preventDefault();

    const ref = firebase.storage().ref();
    const name = (+new Date()) + '-' + this.state.file.name;
    console.log(metadate);
    const task = ref.child(name).put(this.state.file, metadata);
    task.then((snapshot) => {
      console.log(snapshot.downloadURL);
    });
    
    task.then((snapshot) => {
      document.querySelector('#someImageTagID').src = snapshot.downloadURL;
    }).catch((error) => {
      // A list of errors can be found at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred
          break;
      }
    })
    //this.props.onNew(this.state);
    return false;
  };

  render(){
    return <form onSubmit={this.handleSubmit}>
        <label for="add-image">Ajouter une image</label>
        <input name="add-image" type="file" onChange={ event => this.setState({file : event.target.files[0]})}/>
      <button type="submit">Valider</button>
    </form>
  }
}

export default ImageUpload;
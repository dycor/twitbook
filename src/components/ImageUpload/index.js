import React from 'react';
import firebase from 'firebase';
import imageCompression from 'browser-image-compression';

const ImageUpload = ({setImageUrl , setBase64Image}) => {
 
  const handleImageUpload = async (file) => {
    const ref = firebase.storage().ref();
    
    //console.log('originalFile instanceof Blob', file instanceof Blob);
    //console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    const minifyOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(file, minifyOptions);
      //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
      //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const minifiedFile = await handleImageUpload(file);
    
    const ref = firebase.storage().ref();
    
    const name = (+new Date()) + '-' + minifiedFile.name;
    const dirFolder = 'tweets/';
    const path = dirFolder + name;
    
    const task = ref.child(path).put(minifiedFile);
    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        document.querySelector('#uploaded-img').src = downloadURL;
        document.querySelector('#uploaded-img').alt = name;
        document.querySelector('#uploaded-img').title = name;
        document.querySelector('#uploaded-img').style.display = "block";

        let reader = new FileReader();
        let base64 = '';

        reader.readAsDataURL(minifiedFile);
        reader.onload = function () {
          base64 = reader.result;
          setBase64Image(base64);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

        setImageUrl(downloadURL);
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
        <label htmlFor="image-upload-input">Joindre une image</label>
        <input id="image-upload-input" name="image-upload-input" type="file" onChange={handleChange}/>
        <img id="uploaded-img" width="50%"/>
      </div>
}

export default ImageUpload;
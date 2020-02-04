import React from 'react';
import {Link} from 'react-router-dom'


class AddPost extends React.Component {
 
    state = {
        title: '',
        img: '',
        description: '',
        displayCamera: false,
        pictureTaken: false,
        recordedImage: '',
        fileUpload: true,
        cameraUpload: false
    }

    takePhoto = () => {
      let video = document.querySelector('video');
      let canvas = document.querySelector('canvas');
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, 640, 480)
      let image = canvas.toDataURL("image/png")
      this.setState({recordedImage: image, displayCamera: false})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    chooseFileUpload = () => {
      this.setState({cameraUpload: false, fileUpload: true})
    }

    chooseCameraUpload = () => {
      this.setState({fileUpload: false, cameraUpload: true})
    }

    handleImageUpload = (e) => {
      this.setState({img: e.target.files[0]})
      console.log(e.target.files[0])
    }

    handleCamera = () => {
      this.setState({displayCamera: true})

      let constraintObj = { 
        audio: false   , 
        video: { 
            facingMode: "environment", 
            width: { min: 300, ideal: 350, max: 350 },
            height: { min: 530, ideal: 530, max: 530 } 
        } 
    }; 

    navigator.mediaDevices.getUserMedia(constraintObj).then(media => {
      let video = document.querySelector('video');
      video.srcObject = media;
      video.onloadedmetadata = (ev) => video.play();
  })}


    handleClick = () => {
      this.props.addPost(this.state)
    }
  
    render() {
      return (
        <React.Fragment>
          {
            this.state.displayCamera ? 
            
            <div className="ui container">
                <video controls></video>
              <button onClick={this.takePhoto} className="ui button">Snap</button>
              <Link to={'/addPost'}>back</Link>
              <canvas width="640" height="480"></canvas>
            </div>
            :
            <div className="ui card container header-margin-top">
              <div className="content">
              <div className="teal"><h1 >Spread Some Gossip</h1></div>
            <div className="ui form">
                <div className="field">
                    <label className="header-margin-top">Title</label>
                    <input value={this.state.title} onChange={this.handleChange} name="title" type="text"></input>
                    <label className="header-margin-top">Image</label>

                      <div className="ui form">
                        <div className="inline fields">
                          <div className="field">
                            <div className="ui radio checkbox">
                            <input
                              name="isGoing"
                              type="checkbox"
                              checked={this.state.fileUpload}
                              onChange={this.chooseFileUpload} />
                              <label>Upload Image</label>
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui radio checkbox">
                            <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.cameraUpload}
                                onChange={this.chooseCameraUpload} />
                              <label>Upload With Camera</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    {
                      this.state.fileUpload ?
                      <input onChange={this.handleImageUpload} classname='ui button' name="img" type="file"></input>
                      :
                      <button onClick={this.handleCamera} className="ui button">Use Camera</button>
                    
                    }
                    {
                      this.state.recordedImage ? 
                      <div>Your Image Has Been Uploaded </div> 
                      
                      : null
                    }
                    
                    <label className="header-margin-top">Description</label>
                    <textarea value={this.state.description} onChange={this.handleChange} name="description"></textarea>
                    <button onClick={this.handleClick} className="ui button teal input-button-margin-top" type="submit">Submit</button>
                    <Link to={'/app'}>back</Link>
                </div>
            </div>
            </div>
            </div>
          }
        </React.Fragment>
      );
    }
  }
  
  export default AddPost;
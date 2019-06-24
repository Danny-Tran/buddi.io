import React, {Component} from 'react';
import Webcam from "react-webcam";


class WebcamCapture extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };
  
  

  render() {
    const videoConstraints = {
      width: 180,
      height: 720,
      facingMode: "user"
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={50}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={50}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default WebcamCapture
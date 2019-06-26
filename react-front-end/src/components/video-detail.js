// import React, { Component } from 'react'

// class VideoDetail extends Component {
//   constructor(props) {
//       super(props)
//       this.state = undefined
//   }

//   componentWillReceiveProps(props) {
//       if(props.video) {
//           this.setState(props.video)
//       }
//   }

//   render() {
//     if (!this.state) {
//       return <div>Video loading ...</div>
//     }
//     const title = this.state.snippet.title
//     const description = this.state.snippet.description
//     const videoId = this.state.id.videoId
//     const videoUrl = `https://youtube.com/embed/${videoId}`

//     return (
//         <div className="video-detail col-md-8">
//           <div className="embed-responsive embed-responsive-21by9">
//             <iframe className="embed-responsive-item" src={videoUrl} width="700" height="450"></iframe>
//           </div>
//           <div className="details">
//             <div className="title">{title}</div>
//             <div className="desc">{description}</div> -->
//           </div>
//         </div>
//     )
//   }
// }

// export default VideoDetail

import React from 'react';
import YouTube from 'react-youtube';
import io from 'socket.io-client';
 
class Example extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      id: ''
    }

    this.socket = io('localhost:8080');
    this.socket.on('state', function(data){
      if (data === "play"){
        data.playVideo()
      }
    })
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    // console.log("YOUTUBE",YT.Player);

    if (!this.props.video) {
      return null
    }
    console.log("VIDEO1",this.props.video)
 
    return (
      <YouTube
        videoId={this.props.video.id.videoId}
        opts={opts}
        onReady={this._onReady}
        onPlay={(play) => console.log("ONPLAY", play)}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Example


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
      id: this.props.video && this.props.video.id.videoId
    }

    this.socket = io('localhost:8080');
    
    this.socket.on('onPause', (data) => {
      console.log("received", typeof data, data)
      this.setState({id: data.id})
    })
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    if (this.state.id !== nextProps.video.id.videoId) {
      this.socket.emit('state', {id: nextProps.video.id.videoId})
      this.setState({ id: nextProps.video.id.videoId})
    }
  }

  render() {
    
    const opts = {
      height: '390',
      width: '690',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    

    // var player;
    // function onYouTubePlayerAPIReady() {
    //   player = new YT.Player('iframe', {
    //     height: '360',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }

    console.log("VIDEO1",this.props.video)
    if (!this.props.video) {
      return null
    }

    // this.socket.emit('state', {id: this.props.video.id.videoId}) 

    return (
      <YouTube
        videoId={this.state.id}
        opts={opts}
        onReady={this._onReady}
        onPlay={(play) => console.log("ONPLAY", play)}
        />
      
    );
  }
 
  _onReady = (event) => {
    // access to player in all event handlers via event.target
      // this.socket.emit('state', {id: this.props.video.id.videoId}) 
    event.target.pauseVideo();
    // this.socket.on('onPause', function(data){
    //   console.log("received", typeof data, data)
    //   this.setState({id: data.id})
    // })
    console.log("EVENT",this.props.video.id.videoId)
        // (<div className="video-detail_col-md-8">
        //   <div className="embed-responsive_embed-responsive-21by9">
        //     <iframe className="embed-responsive-item" src={videoUrl} ></iframe>
        //   </div>
        //   <div className="details">
        //     <div className="title"><strong><h3>{title}</h3></strong></div>
        //     <div className="desc">{description}</div>
        //   </div>
        // </div>)
    
  }
}

export default Example


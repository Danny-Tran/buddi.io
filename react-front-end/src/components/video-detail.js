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
  }


  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    if (this.state.id !== nextProps.video.id.videoId) {
      this.props.socket.emit('state', {id: nextProps.video.id.videoId})
      this.setState({ id: nextProps.video.id.videoId})
    }
  }

  componentDidMount() {
    this.props.socket.on('onPause', (data) => {
      console.log("received", typeof data, data)
      this.setState({id: data.id})
    })

    this.props.socket.on('youtube_playVideo', (data) => {
      this.player.playVideo()
      // this.player.seekTo()
      console.log("ONPLAY FROM VIDEO DETAIL", data.time)
      // console.log("Seeking", this.player.seekTo(data.time))
    })

    // this.props.socket.on('seek_playVideo', (data) => {
    //   // this.player.playVideo()
    //   this.player.seekTo()
    //   // console.log("ONPLAY FROM VIDEO DETAIL", data.time)
    //   console.log("Seeking", this.player.seekTo())
    // })

    this.props.socket.on('youtube_pauseVideo', (data) => {
      this.player.pauseVideo()
      console.log("ONPLAY FROM VIDEO DETAIL", data)
    })
  }

  render() {
    
    const opts = {
      height: '450',
      width: '810',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    

    console.log("VIDEO1",this.props.video)
    if (!this.props.video) {
      return null
    }

    return (
      <YouTube
        videoId={this.state.id}
        opts={opts}
        onReady={this._onReady}
        onPause={this._onPause}
        onPlay={this._onPlay}
        // onStateChange={this._currentTime} 
        />
    );
  }

  // _currentTime = (event) => {
  //   // console.log("Play event", event.data)
  //   // console.log("PLAYERERERERER", this.player.getCurrentTime())
  //   this.props.socket.emit('youtube_onPlay', this.player.getCurrentTime())
  // }

  _onPlay = (event) => {
    console.log("Play event", event.data)
    console.log("PLAYERERERERER", this.player.getCurrentTime())
    this.props.socket.emit('youtube_onPlay', {event: event.data, time: this.player.getCurrentTime()})
  }


  _onPause = (event) => {
    console.log("pause event", event.data)
    this.props.socket.emit('youtube_onPause', event.data)
  }

  _onReady = (event) => {
    this.player = event.target;
    console.log("Play event", event.target.playVideo())

    event.target.pauseVideo();
    console.log("EVENT",this.props.video.id.videoId)
  }

}

export default Example


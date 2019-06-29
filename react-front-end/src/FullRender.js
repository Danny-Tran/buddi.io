import _ from 'lodash';

import React, { Component } from 'react';

import axios from 'axios';
import YTSearch from 'youtube-api-search';
import Webcam from 'react-webcam';
import io from "socket.io-client";

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';
import './App.css';
import Chat_bar from "./Chat_bar.js";
import Main from "./components/main.js";
import ChatBubble from 'react-chat-bubble';
import UserBar from "./user_bar.js";

const API_KEY = 'AIzaSyCbA7kPYhwuP9DIhxpxlTeZomZ0g3BBw8U';


class FullRender extends Component {

  turnOn = () => {
    this.setState({ webcamEnabled: true });
    // console.log("This.webcam", this.webcam.stream)
    // this.socket.emit('webcam_connected', this.webcam.stream)
  }
  turnOff = () => this.setState({ webcamEnabled: false });

  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      videos: [],
      selectedVideo: null,
      webcamEnabled: false
    }
    this.debounceSearch = _.debounce(this.videoSearch, 600);

  }
  handleUserMedia = (event) => {
    console.log("usermedia", event);
    console.log("This.webcam", this.webcam.stream)
    // console.log("This.webcam", this.webcam.streaur)
    this.setState({ stream: this.webcam.stream })
    // this.socket.emit('webcam', this.webcam.stream)
  }
 

  componentDidMount() {
    //this.socket = io('localhost:8080');
    this.socket = io('http://192.168.15.141:3000');
    this.videoSearch('london');

    // this.socket.on('webcam_stream', (data) => {
    //   // this.webcam
    //   console.log("Webcam details", this.webcam)
    // })
  }

  videoSearch = (term) => {
    if (term.length > 3) {
      YTSearch({key: API_KEY, term: term}, videos => {
        console.log("VIDEOS", videos)
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      });
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    alert(imageSrc);
  };

  // fetchData = () => {
  //   axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API

  //     console.log(response.data.message) // Just the message
  //     this.setState({
  //       message: response.data.message
  //     });
  //   }) 
  // }

  render() {
    // const videoSearch = _.debounce(term => {
    //   this.videoSearch(term);
    // }, 300);
    if (!this.socket) return null;
    return (
   
        <div className="appContainer">
          <div className="nav-bar">
            <a><img className="logo-img" src="https://getgreenline.co/wp-content/uploads/2018/08/Buddi_logo_blue_green.png"/></a>
            <SearchBar onSearchTermChange={this.debounceSearch}/>
          </div>
          <div className = "parents">
            <div className="user-bar"> Users
              <div> <UserBar/> </div>
              {this.state.webcamEnabled ? (
                  <Webcam 
                    // audio={false}
                    height={120}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={120}
                    onUserMedia={this.handleUserMedia}
                  />
              ) : (
                <button type="button" onClick={this.turnOn}>
                  Webcam On
                </button>
              )}

              <button type="button" onClick={this.turnOff}>
                  Turn Off
              </button>

              <button onClick={this.capture}>Capture photo</button>
              <video style={{ height: 100, width: 100 }} src={this.state.stream} />
               <div> <UserBar socket={this.socket} /> </div>
            </div>
        
            <div className="video-bar">
            <div className="embed-responsive-item">
              <VideoDetail video={this.state.selectedVideo} socket={this.socket} />
            </div>
              <VideoList
                 onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                 videos={this.state.videos}
              />
            </div>

            <div role="complimentary" className="chat-bar" > 
              <Chat_bar socket={this.socket} />
          </div>         
        </div>
        </div>

        

    );
  }
}

export default FullRender;

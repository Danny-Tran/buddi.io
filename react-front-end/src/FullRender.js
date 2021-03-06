import _ from 'lodash';

import React, { Component } from 'react';

import axios from 'axios';
import YTSearch from 'youtube-api-search';
import Webcam from 'react-webcam';
import io from "socket.io-client";
import { BrowserRouter, Route, Link } from "react-router-dom";

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';
import './App.css';
import Chat_bar from "./Chat_bar.js";
import Main from "./components/main.js";
import ChatBubble from 'react-chat-bubble';
import UserBar from "./user_bar.js";
import Cam from './components/web-cam.js';
import MyComponent from './components/emoji-bar.js';
import Popup from "reactjs-popup";

//const API_KEY = 'AIzaSyCbA7kPYhwuP9DIhxpxlTeZomZ0g3BBw8U';

//const API_KEY = 'AIzaSyBfEFfcK6P9vfXt3I_oTUBGf_TPNn4GvzI';
const API_KEY = 'AIzaSyCohkXg4GyBE3Y2qMLAskM9fKovaLiLHQo';
//const API_KEY = 'AIzaSyDUeRFXqsnKAJp30XCoQOhksFTJ4PVN4ck';
// const API_KEY = 'AIzaSyAWozCjsQeq44RvaA-VPapn7tEb46ESRHY';




class FullRender extends Component {
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

  componentDidMount() {
    // this.socket = io('http://192.168.15.153:3000');
    // this.socket = io('http://192.168.15.141:3000');
    this.socket = io('http://localhost:3000');
    this.videoSearch('NewYork');
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

  handleUserMedia = (event) => {
    console.log("usermedia", event);
    console.log("This.webcam", this.webcam.stream)
    // console.log("This.webcam", this.webcam.streaur)
    this.setState({ stream: this.webcam.stream })
    // this.socket.emit('webcam', this.webcam.stream)
  }

  turnOn = () => {
    this.setState({ webcamEnabled: true });
    // console.log("This.webcam", this.webcam.stream)
    // this.socket.emit('webcam_connected', this.webcam.stream)
  }
  turnOff = () => this.setState({ webcamEnabled: false });


  setRef = webcam => {
    this.webcam = webcam;
  };

  render() {
    if (!this.socket) return null;
    return (
   
        <div className="appContainer-full">
          <div className="nav-bar">
            <a><img className="logo-together" src={require('./together.png')}/></a>
            <a><img className="logo-img" src={require('./buddi.png')}/></a>
            <SearchBar onSearchTermChange={this.debounceSearch}/>
            <Popup trigger={<button className="invite-button">Invite</button>}position="left" >
              <div>Add to room http://192.168.15.141</div>
            </Popup>
            <Link to="/"><button className="logout-button">Logout</button></Link>
          </div>

          <div className = "parents">

            <div className="user-bar"> 
               <div> <UserBar socket={this.socket} /> </div>
               {this.state.webcamEnabled ? (
                  <div>
                  <Webcam 
                    // audio={false}
                    height={120}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={120}
                    onUserMedia={this.handleUserMedia}
                  />
                  <button class="button-off" type="button" onClick={this.turnOff}>
                    Turn Off
                  </button>
                  </div>
              ) : (
                <button class="button-on" type="button" onClick={this.turnOn}>
                  Webcam On
                </button>
              )}

              <video style={{ height: 100, width: 100 }} src={this.state.stream} />
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
              {/* <MyComponent /> */}
            </div>  

          </div>

          <footer className='footer-full'>
                <span>Contact: Lighthouse Labs </span>
                |     
                <span> Email: <a href="mailto:someone@example.com">buddiIo@gmail.com</a>.</span>
                {/* <img src="https://img.icons8.com/clouds/60/000000/email.png"></img> */}
          </footer>
        </div>
    );
  }
}

export default FullRender;

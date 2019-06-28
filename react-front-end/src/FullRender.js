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
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      videos: [],
      selectedVideo: null
    }
    this.debounceSearch = _.debounce(this.videoSearch, 600);

  }

  componentDidMount() {
    this.socket = io('localhost:8080');
    this.videoSearch('dubai');
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

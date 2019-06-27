import _ from 'lodash';

import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
import axios from 'axios';
import YTSearch from 'youtube-api-search';
import Webcam from 'react-webcam';
import io from "socket.io-client";

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';
import './App.css';
import Chat_bar from "./Chat_bar.js";

const API_KEY = 'AIzaSyCbA7kPYhwuP9DIhxpxlTeZomZ0g3BBw8U';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      videos: [],
      selectedVideo: null
    }

    // this.socket = io('localhost:8080');

    // this.socket.on('RECEIVE_MESSAGE', function(data){
    //     console.log("Im receving from Chat_bar")
    //     addMessage(data);
    // });

    // this.socket.on('onPause', (data) => {
    //     console.log("received", typeof data, data)
    //     this.setState({id: data.id})
    //   })
  }
  



  componentDidMount() {
    this.videoSearch('Silicon Valley');
  }

  videoSearch = (term) => {
    YTSearch({key: API_KEY, term: term}, videos => {
      console.log("VIDEOS", videos)
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
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

    return (
      <div className="appContainer">
        <div class="nav-bar">Buddi.io
        </div>

        <div class = "parents">
          <div class="user-bar">Users
            <div class="user-layout">
              <div class="webcam"></div>
              <p class="user1">User 1</p>
              <p class="user2">User 2</p>
            </div>
          </div>
      
        <div class="video-bar">
          <SearchBar onSearchTermChange={this.videoSearch}/>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList 
              onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
              videos={this.state.videos} 
          />
        </div>

        <div role="complimentary" className="chat-bar" class="chat-bar"> 
          <Chat_bar/>
        </div>         
      </div>
      </div>
      
    );
  }
}

export default App;

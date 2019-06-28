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

const API_KEY = 'AIzaSyDUeRFXqsnKAJp30XCoQOhksFTJ4PVN4ck';

class App extends Component {
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

    return (
      <div className="appContainer">
        <div className="nav-bar">
        <a><img className="logo-img" src="https://getgreenline.co/wp-content/uploads/2018/08/Buddi_logo_blue_green.png"/></a>
        <SearchBar onSearchTermChange={this.debounceSearch}/>
        </div>

        <div className = "parents">
          <div className="user-bar">Users
            <div className="user-layout">
              <div className="webcam"></div>
              <p className="user1">User 1</p>
              <p className="user2">User 2</p>
            </div>
          </div>
      
        <div className="video-bar">
        <div className="embed-responsive-item">
          <VideoDetail video={this.state.selectedVideo} />
        </div>
          <VideoList
             onVideoSelect={selectedVideo => this.setState({selectedVideo})}
             videos={this.state.videos}
          />
        </div>

        <div role="complimentary" className="chat-bar" > 
          <Chat_bar/>
        </div>         
      </div>
      </div>
      
    );
  }
}

export default App;

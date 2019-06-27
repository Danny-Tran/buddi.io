import _ from 'lodash';

import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
import axios from 'axios';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';
import './App.css';
import Chat_bar from "./Chat_bar.js";
const API_KEY = 'AIzaSyAWozCjsQeq44RvaA-VPapn7tEb46ESRHY';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('Silicon Valley');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
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
        <div class="nav-bar">
        <a><img className="logo-img" src="https://getgreenline.co/wp-content/uploads/2018/08/Buddi_logo_blue_green.png"/></a>
          <SearchBar onSearchTermChange={this.videoSearch}/>
        </div>

        <div class = "parents">
          <div class="user-bar">Users
            <div class="user-layout">
              <p class="user1">User 1</p>
              <p class="user2">User 2</p>
            </div>
          </div>
      
        <div class="video-bar">
          
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

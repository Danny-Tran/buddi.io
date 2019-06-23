import _ from 'lodash';

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
const API_KEY = 'AIzaSyBV7rOg-k0NIr7__-LRO_Wz7WVGbF3Dmfw';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('react js');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    
    return (
      <div className="App">
                
      </div>
    );
  }
}

export default App;

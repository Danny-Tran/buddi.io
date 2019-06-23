import _ from 'lodash';

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
const API_KEY = 'AIzaSyBV7rOg-k0NIr7__-LRO_Wz7WVGbF3Dmfw';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
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
    return (
      <div className="App">
                
      </div>
    );
  }
}

export default App;

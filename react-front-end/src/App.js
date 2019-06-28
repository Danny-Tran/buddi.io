import _ from 'lodash';

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
// import ReactDOM from 'react-dom'

import FullRender from './FullRender';
import './App.css';
import Main from "./components/main.js";

const API_KEY = 'AIzaSyDUeRFXqsnKAJp30XCoQOhksFTJ4PVN4ck';


class App extends Component {
  render() {
    // const videoSearch = _.debounce(term => {
    //   this.videoSearch(term);
    // }, 300);

    return (
      <BrowserRouter>
        

        <Route exact path="/" component={Main} />
        <Route path="/main" component={FullRender} />
      </BrowserRouter>
    );
  }
}

export default App;

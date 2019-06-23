import React, { Component } from 'react'

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {term : ''}
    this.onInputChange = this.onInputChange.bind(this)
  }

  render() {
    return (
      <div className="search-bar">
        <i class="fa fa-youtube-play" ></i>
        <input onChange={this.onInputChange}/>    
        <i className="fa fa-search" aria-hidden="true"></i>
      </div>
    );
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
    this.props.onSearchTermChange(event.target.value)
  }
}

export default SearchBar
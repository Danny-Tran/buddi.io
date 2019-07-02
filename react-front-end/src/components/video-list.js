import React, { Component } from 'react'
import VideoListItem from './video-list-item'

class VideoList extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const videoItems =  this.props.videos.map((video) => {
      return (
        <div>
        <em><VideoListItem 
          onVideoSelect={this.props.onVideoSelect}
          key={video.etag} 
          video={video} /></em>      
          <em><VideoListItem 
          onVideoSelect={this.props.onVideoSelect}
          key={video.etag} 
          video={video} /></em>   
          </div>  
          )
    })

    return (
      <div className="col-md-4_list-group">
        {videoItems}
      </div>
    )
  }
}

export default VideoList
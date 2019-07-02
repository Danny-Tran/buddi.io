import React, { Component } from 'react'
import Truncate from 'react-truncate';

class VideoListItem extends Component {
  constructor(props) {
    super(props)
    this.video = props.video
    this.key = props.key
    this.onVideoSelect = props.onVideoSelect
  }

  render() {
    const imgUrl = this.video.snippet.thumbnails.default.url
    const title = this.video.snippet.title

    return (
      <div onClick={() => this.onVideoSelect(this.video)} className="list-group-item">
        <div className="video-list-media">
          <div className="media-left">
            <img className="media-object" src={imgUrl} />
          </div>
          <div className="media-body">
            <Truncate className="media-heading" lines={3}>
              {title}
            </Truncate>
          </div>
        </div>
          
      </div>  
    )
  }
}

export default VideoListItem
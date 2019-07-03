import React from "react";
import io from "socket.io-client";
import ChatBubble from 'react-chat-bubble';

class Chat_bar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        username: '',
        message: '',
        messages: []
    };
  }

  componentDidMount() {
    this.props.socket.on('RECEIVE_MESSAGE', (data) => {
      console.log("Im receving from Chat_bar")
      this.addMessage(data);
    });
    this.props.socket.on('userCount', (data) => {
      console.log("online", data.userCount)
      this.setState({counter:data.userCount})
    })
  }

addMessage = data => {
    console.log(data);
    this.setState({messages: [...this.state.messages, data]});
    console.log(this.state.messages);
};

sendMessage = ev => {
  ev.preventDefault();
  this.props.socket.emit('SEND_MESSAGE', {
      author: this.state.username,
      message: this.state.message
  })
  this.setState({message: ''});
}

  render(){
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
            <div className="card-title"> Chat Messages  ({this.state.counter}) online</div>
              <hr/>
              {/* <div className="author-name">
              
                  {this.state.messages.map(message => {
                      return (
                          <div>{message.author}</div>
                      )
                  })}
                  
              </div> */}
            <div className="containerr">
              {this.state.messages.map(message => {
                return (
                  <div className="container">
                  <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar"></img>
                  <span class="time-right">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }</span>
                  <div className='author-name'>{message.author}</div>
                  
                    <div className='message-content'> {message.message}</div>
                  </div>
                )
              })}
                  
              </div>
            </div>
            <div className="card-footer">
              <input    type="text" placeholder=" Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-name"/>
              <br></br>
              <input  type="text" placeholder=" Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} className="form-message"/>
              
              <button onClick={this.sendMessage} className="plane-button"><img src={require('./plane.png')}  className="btn_btn-primary_form-control"/></button>
            </div>
      </div>
    </div>
          
  );
}
}
export default Chat_bar;
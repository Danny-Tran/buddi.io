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

    this.socket = io('localhost:8080');

    this.socket.on('RECEIVE_MESSAGE', function(data){
      console.log("Im receving from Chat_bar")
      addMessage(data);
    });

  const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
  };

  this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
          author: this.state.username,
          message: this.state.message
      })
      this.setState({message: ''});

  }
}

render(){
  return (
    <div className="container">
        <div className="card">
            <div className="card-body">
                <div className="card-title">Chat Room Messages </div>
                
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
                              <span class="time-right">{ }</span>
                                <div> {message.message}</div>
                              </div>
                            )
                        })}
                        
                    </div>

                      </div>
                      <div className="card-footer">
                          <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-name"/>
                          <br/>
                          <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} className="form-message"/>
                          <br/>
                          <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                      </div>
                  </div>
    </div>
          
  );
}
}
export default Chat_bar;
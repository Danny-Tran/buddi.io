import React from "react";
import io from "socket.io-client";

class UserBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: [],
    };
  }

  componentDidMount() {
    // this.props.socket = io('localhost:8080');

    const addUser = data => {
      this.setState({username: [...this.state.username, data.author]});
    };

    this.props.socket.on('RECEIVE_MESSAGE', function(data){
      addUser(data)
      console.log("Im receving from USER_BAR",data.author)
    });
  }


  render(){
    const users = this.state.username
    function uniqueArray(users){
      const result = Array.from(new Set(users))
      return result
    }
    return (
      
        <div class="user-layout">
          <div class="user-container">
            <div class="led-box">
              {uniqueArray(users).map(user => (
                <div class="user-led">
                  <div class="led">
                    <p class="led-green"></p>
                  </div>
                    <p class="users"> {user}</p>
                </div>))
              }             
            </div>
          </div>
        </div>
      
    )
  }
}

export default UserBar;
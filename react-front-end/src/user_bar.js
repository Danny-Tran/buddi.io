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
    this.socket = io('localhost:8080');

    const addUser = data => {
      this.setState({username: [...this.state.username, data.author]});
    };

    this.socket.on('RECEIVE_MESSAGE', function(data){
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
      <div class="user-bar">
        <div class="user-layout">
          <ul>
            {uniqueArray(users).map(user => (
              <li> {user} </li>))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default UserBar;
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
    const users = this.state.username.map((user, index) => {
      return  <li key={index}> {user} </li>
    })
    return (
      <div class="user-bar">
        <div class="user-layout">
          <ul>
            {users}
          </ul>
        </div>
      </div>
    )
  }
}

export default UserBar;
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'
import Header from './Header.jsx'



class App extends Component {
  constructor() {
  super();

  this.state = {
    currentUser: {name: "Bob"},
    messages: [],
    onlineUsers: []
  };
  this.onNewPost = this.onNewPost.bind(this);
  this.onUsernameChange = this.onUsernameChange.bind(this);
}

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001");
  this.socket.onopen = ((conn) => {
    console.log('Connected to server');


    this.socket.onmessage = ((event)=> {
      console.log(event.data)
      const message = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(message);
      this.setState({messages: newMessages});

    this.socket.onclose = ((close) => {

    });
    });
  });
}

  onNewPost(content) {
    const newPost = {type: 'postMessage', username: this.state.currentUser.name, content: content};
    const post = this.state.messages.concat(newPost);
    // this.setState({messages: post});
    //this.setState({currentUser: newPost.username})
    console.log(this.socket);
    this.socket.send(JSON.stringify(newPost));
  }
  onUsernameChange(username) {
    const newUsernameSend = {type:'postNotification', content: `${this.state.currentUser.name} has changed their username to ${username}.`}
    this.socket.send(JSON.stringify(newUsernameSend))
    const newUsername = {name: username};
    this.setState({currentUser: newUsername});
    console.log(this.state.currentUser);
  }

  render() {

    return (
      <div>
        <Header/>
        <MessageList messages={this.state.messages}/>
        <ChatBar onUsernameChange={this.onUsernameChange} onNewPost={this.onNewPost} currentUserName={this.state.currentUser.name}/>
      </div>
    )
  }
}
export default App;

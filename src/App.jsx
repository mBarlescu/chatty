import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'




class App extends Component {
  constructor() {
  super();

  this.state = {
    currentUser: {name: "Bob"},
    messages: [],
  };
  this.onNewPost = this.onNewPost.bind(this);
  this.onUsernameChange = this.onUsernameChange.bind(this);
}

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001");
  this.socket.onopen = ((conn) => {
    console.log('Connected to server');

    this.socket.onmessage = ((event)=> {
      const message = JSON.parse(event.data);
      switch(message.type){
        case "incomingMessage":
          const newMessages = this.state.messages.concat(message);
          this.setState({messages: newMessages});
          break;
        case "incomingNotification":
          const newNotification = this.state.messages.concat(message);
          this.setState({messages: newNotification});
          break;
        default:

          throw new Error("Unknown event type " + message.type);
      }
    });

  })
}



 //console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage);
  //   // Update the state of the app component.
  //   // Calling setState will trigger a call to render() in App and all child components.
  //   this.setState({messages: messages})
  // }, 3000);


// componentDidUpdate(){
//   this.socket.onmessage = function(event) {
//     const message = JSON.parse(event.data);
//     console.log(message);
//     console.log(message.content)
//     // const newMessages = this.state.messages.concat(message.content);
//     this.setState({messages: message.content})
//     console.log(this.state)
//   }
// }

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
      <html>
      <head>
        <title>Chatty></title>
        <link rel ="stylesheet" type = "text/css" href="./styles/home.scss">
        </link>
      </head>
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages={this.state.messages}/>
        <ChatBar onUsernameChange={this.onUsernameChange} onNewPost={this.onNewPost} currentUserName={this.state.currentUser.name}/>
      </body>
      </html>
    )
  }
}
export default App;

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
}

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001");
  this.socket.onopen = ((conn) => {
    console.log('Connected to server');

    this.socket.onmessage = ((event)=> {
      const message = JSON.parse(event.data);
      console.log(message);
      console.log(message.content)
      const newMessages = this.state.messages.concat(message);
      this.setState({messages: newMessages});
      console.log(this.state)
    });
  });




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
}

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

  onNewPost(username, content) {
    const newPost = {id: '', username: username, content: content};
    const post = this.state.messages.concat(newPost);
    // this.setState({messages: post});
    this.setState({currentUser: newPost.username})
    console.log(this.socket);
    this.socket.send(JSON.stringify(newPost));
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
        <ChatBar onNewPost={this.onNewPost} currentUserName={this.state.currentUser.name}/>
      </body>
      </html>
    )
  }
}
export default App;

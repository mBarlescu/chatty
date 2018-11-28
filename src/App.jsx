import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'


class App extends Component {
  constructor() {
  super();

  this.state = {
  currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id:1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id:2
    }
  ],
}
  this.onNewPost = this.onNewPost.bind(this);
}

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  onNewPost(username, content) {
    const newPost = {id:Date.now(), username: username, content: content};
    const post = this.state.messages.concat(newPost);
    this.setState({messages: post});
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

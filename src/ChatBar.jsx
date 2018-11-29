import React, {Component} from 'react';

class ChatBar extends Component {
constructor(props){
  super(props);
  this.state = {
    username: this.props.currentUserName,
    content: ""
  };
}

onUsernameChange(event) {
  console.log(this.state.username);
  const keycode = event.charCode;

  // console.log('new username:', event.target.value);
  this.setState({username: event.target.value});
};
onUsernameChangeReal(event){
  const keycode = event.charCode;
  if(keycode === 13){
    this.props.onUsernameChange(this.state.username);
  };
}
// if(keycode === 13){

//     this.props.onUsernameChange(this.state.username);
//   };

onContentChange(event) {
  this.setState({content: event.target.value});
}
onSubmit(event) {
  const keycode = event.charCode;
  if(keycode === 13){
  this.props.onNewPost(this.state.content);
  event.target.value = '';
}
}


render(){

  return (
    <footer className="chatbar">
      <input className="chatbar-username" value={this.state.username} onChange={this.onUsernameChange.bind(this)} onKeyPress={this.onUsernameChangeReal.bind(this)}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onContentChange.bind(this)} onKeyPress={this.onSubmit.bind(this)}/>
    </footer>
  )}
}

export default ChatBar;
import React, {Component} from 'react';

class Message extends Component{
constructor(props){
  super(props);
}

messageClass() {
  switch(this.props.post.type){
    case "incomingMessage":
      return "message";
    case "incomingNotification":
      return "notification";
    default:
      return "";
  }
}
render(){


  return(
    <div className={this.messageClass()} >
      <span className={`${this.messageClass()}-username`} >
        {this.props.post.username}
      </span>
      <span className={`${this.messageClass()}-content`}>
        {this.props.post.content}
      </span>
    </div>
    )
  }

}
export default Message;
import React, {Component} from 'react';

class Message extends Component{
constructor(props){
  super(props);
}
render(){
  return(
    <div className="messages" >
      <span className="message-username" >
        {this.props.post.username}
      </span>
      <span className="message-content">
        {this.props.post.content}
      </span>
    </div>
    )
}
}
export default Message;
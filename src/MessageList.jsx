import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component{
render(){
  const messages = this.props.messages;
  const posts = messages.map((post, index) => {
  return <Message post={post} key={index}/>
  });
  return(
<div>
<main className="messages">
  {posts}

</main>
</div>
)}
}

export default MessageList;
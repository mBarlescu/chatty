import React, {Component} from 'react';

class Header extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
    <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className ="onlineUsers">Online Users: {this.props.onlineUsers}</span>
        </nav>
    )
  }
}

export default Header;
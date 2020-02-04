import React from 'react';
import {Link} from 'react-router-dom'


class NavBar extends React.Component {

  state = {
    longitude: '',
    latitude: ''
}

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

handleClick = () => {
  this.props.changeLocation(this.state)
}

goHome = () => {
  console.log("getting location")
  this.props.getLocation()
}

logOut = () => {
      this.props.logOut()
}
  render() {
    return (
    <div className="ui menu nav-options">
      <a onClick={this.goHome} className="item">
        <i class="home icon"></i>home
      </a>
    <a className="item">
      <i class="plus icon"></i>
        <Link to={'/addPost'}>Post</Link>
    </a>
    <a onClick={this.props.toggleForm} className="item">
      <i class="compass icon"></i> Location
    </a>
      <a className="item" onClick={this.logOut}>
        <i class="sign out alternate icon"></i> Log Out
      </a>
  </div>
    );

  }
}

export default NavBar;
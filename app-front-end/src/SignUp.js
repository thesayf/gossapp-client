import React from 'react'
import {Link} from 'react-router-dom'
import API from './adapters/API';

class SignUp extends React.Component {

  state = {
      name: '',
      email: '',
      password: '',
      img: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleImageUpload = (e) => {
    this.setState({img: e.target.files[0]})
  }

  handleClick = () => {
  API.createUser(this.state).then(console.log)
    
    
    // response => localStorage.token = response.token)
  }

  render() {
    
    return (
      <React.Fragment>
        <div className="login-container"> 
        <div className="login-form-container">
      <div className="ui segment login-width">
      <div className="login-logo">
      <div className="ui Tiny image logo-text-center">
        <img src={require('./logo_transparent_background.png')}></img>
    </div>
    </div>
      <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input onChange={(e) => this.handleChange(e)} name="name" placeholder="First Name" type="text"></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" placeholder="email" type="text"></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name="password" placeholder="Last Name" type="text"></input>
          </div>
          <div className="field">
            <label>Avatar</label>
            <input onChange={this.handleImageUpload} classname='ui button' name="img" type="file"></input>
          </div>
        <div className="inline field">
           <Link to={'/'}> Log In</Link>
        </div>
        <div onClick={this.handleClick}className="ui submit button">Submit</div>
      </div>
    </div>
    </div>
    </div>
    </React.Fragment>
    )
  }
}

export default SignUp

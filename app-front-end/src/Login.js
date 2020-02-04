import React from 'react'
import {Link} from 'react-router-dom'
import './custom.css';

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleClick = () => {
   const userObj = {
      email: this.state.email, 
      password: this.state.password
    }
    this.props.login(userObj)
  }

  render() {
    return (
    <React.Fragment>
    
    <div className="login-container">
    <div className="login-form-container">
      <div className="ui segment login-width">
      <div className="login-logo">
    <div className="ui medium image ">
        <img src={require('./logo_transparent_background.png')}></img>
    </div>
    </div>
      <div className="ui form">
          <div className="field">
            <label>email</label>
            <input onChange={(e) => this.handleChange(e)} name="email" placeholder="email" type="text"></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name="password" placeholder="Last Name" type="password"></input>
          </div>
        <div className="inline field">
           <Link to={'/signUp'}> Sign Up</Link>
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

export default Login

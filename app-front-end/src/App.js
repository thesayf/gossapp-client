import React from 'react';
import Login from './Login'
import SignUp from './SignUp'
import AddPost from './components/AddPost'
import AppContainer from './AppContainer'
import {Route, Redirect} from 'react-router-dom'
import API from './adapters/API';
import './custom.css';

class App extends React.Component {

  state = {
    user: undefined,
    longitude: null,
    latitude: null,
    posts: [],
    currentLocation: true,
    altPosts: []
  }

  componentDidMount = () => {
    API.validateUser()
      .then(user => {
        if(!user.error) this.setState({user: user})
      })

    this.getLocation()
  }

  getLocation = () => {
    this.setState({currentLocation: true})
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("Geo Location not supported by browser")
      }

  }

  showPosition = (position) => {
    this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude})
      API.getPostsByCurrentLocation(this.state.longitude, this.state.latitude).then(posts => this.setState({posts: posts}))
  }

  login = user => {
    API.logIn(user)
      .then(user => this.setState({user: user}))
  }

  signUp = user => {
    API.logIn(user)
      .then(user => this.setState({user: user})).then(this.props.history.push('/app'))
  }

  addPost = formDetails => {
    API.createPost(formDetails, this.state).then(post => this.setState({posts: [...this.state.posts, post]})).then(this.props.history.push('/app'))
  }

  logOut = () => {
    localStorage.removeItem('token')
      this.setState({ user: undefined })
        this.props.history.push('/')
  }

  changeLocation = (state) => {
      API.getCoordinatesFromSearchInput(state).then(coordinates => {
        console.log(coordinates)
        if (coordinates.error) {
          alert(coordinates.error)
        } else {
          API.getPostsUsingCoordinates(coordinates).then(posts => {
            this.setState({currentLocation: false, altPosts: posts})
          })
        }
      })

  }

  posts = () => {
    if(this.state.currentLocation){
      let posts = this.state.posts.sort((a, b) => (a.ratings.length < b.ratings.length) ? 1 : -1)
        return posts
        }
         else {
            let altposts = this.state.altPosts.sort((a, b) => (a.ratings.length < b.ratings.length) ? 1 : -1)
             return altposts
    }
  }

  render() {

    return (
      <React.Fragment>
      <Route path="/" exact component={() => <Login login={this.login} />}/>
        {
          !this.state.user ? <Redirect to="/"></Redirect> : <Redirect to="/app"></Redirect> 
        }
      <Route path="/app" exact component={() => <AppContainer getLocation={this.getLocation} user={this.state.user} changeLocation={this.changeLocation} logOut={this.logOut} posts={this.posts()} getLocation={this.getLocation} />} />
      <Route path="/signUp" exact component={() => <SignUp signUp={this.signUp}/>} />
      <Route path="/addPost" exact component={() => <AddPost addPost={this.addPost} />} />
      </React.Fragment>
    );
  }
}

export default App;

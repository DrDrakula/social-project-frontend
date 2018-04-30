import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, logOut, setUser } from './actions'

class App extends Component {

  checkIfLogged = () => {
    let token = localStorage.getItem('token')
    if(token){
      this.props.logIn()
      this.getUser()
    }
  }

  getUser = () => {
    fetch('http://localhost:3000/users/'+localStorage.getItem('user_id'))
    .then(res => res.json())
    .then(json => {
      this.props.setUser(json.user)
      console.log(this.props.currentUser)
    })
  }

  componentDidMount(){
    console.log(this.props)
    this.checkIfLogged()
  }
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div>
          <Switch>
            <Route exact path='/' render={() => this.props.loggedIn ? <Redirect to='/home' /> : <WelcomePage />}/>
            <Route path='/home' render={() => this.props.loggedIn ? <HomePage /> : <Redirect to='/' />} />
            <Route path='/profile/:slug' render={(routerProps)=> localStorage.getItem('user_id') ? <ProfilePage {...routerProps}/> : <Redirect to='/'/>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {logIn, logOut, setUser})(App));

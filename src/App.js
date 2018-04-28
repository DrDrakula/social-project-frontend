import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, logOut } from './actions'

class App extends Component {

  checkIfLogged = () => {
    let token = localStorage.getItem('token')
    if(token){
      this.props.logIn()
    }
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
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default withRouter(connect(mapStateToProps, {logIn, logOut})(App));

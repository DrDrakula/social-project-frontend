import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logIn, logOut, setUser, search } from '../actions'

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      search: ''
    }
  }

  handleSearch = (event, search) => {
    event.preventDefault()
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(json => {
      let searchResults = json.users.filter((person) => `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`.includes(search.toLowerCase()))
      searchResults = searchResults.sort((a,b) => a.last_name.localeCompare(b.last_name))
      this.props.search(searchResults)
      console.log(this.props.searchResults)
    })
  }

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleLogOut = (event) => {
    event.preventDefault()
    console.log(this.state)
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('first_name')
    this.props.logOut()
  }

  handleLogIn = (event) => {
    event.preventDefault()
    console.log(this.state)
    fetch('http://localhost:3000/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(json => {
      if(!json.error){
        console.log(json)
        this.props.setUser(json.user)
        localStorage.setItem('token',json.token)
        localStorage.setItem('user_id',json.user_id)
        localStorage.setItem('first_name',json.first_name)
        localStorage.setItem('slug',json.slug)
        this.props.logIn()
        this.setState({password: ''})
      }else{
        console.log(json.error)
        this.setState({password: ''})
      }
    })
  }

  logInForm = () => {
    if(this.props.loggedIn){
      return (
        <ul className="navbar-nav mr-auto">
          <input className="form-control mr-sm-2" value={this.state.search} name='search' onChange={this.handleInput} type="text" placeholder="Search for people" aria-label="Search"/>
          <li className="nav-item active dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hi, {localStorage.getItem('first_name')}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link to={`/profile/${localStorage.getItem('slug')}`} className="dropdown-item">Profile</Link>
              <a className="dropdown-item" href="">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" style={{'cursor':'pointer'}} onClick={this.handleLogOut}>Log Out</a>
            </div>
          </li>
        </ul>
      )
    }else{
      return (
        <div>
          <input className="form-control mr-sm-2" value={this.state.email} name='email' onChange={this.handleInput} type="email" placeholder="Email" aria-label="Search"/>
          <input className="form-control mr-sm-2" value={this.state.password} name='password' onChange={this.handleInput} type="password" placeholder="Password" aria-label="Search"/>
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">{this.props.loggedIn ? 'Log Out' : 'Log In'}</button>
        </div>
      )
    }
  }

  render () {
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">SocialNetwork</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to='/home' className="nav-link" href="">Home <span className="sr-only">(current)</span></Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.props.loggedIn ? (event) => this.handleSearch(event,this.state.search) : this.handleLogIn}>
              {this.logInForm()}
            </form>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps, {logIn, logOut, setUser, search})(NavBar);

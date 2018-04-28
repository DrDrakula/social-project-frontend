import React from 'react'

class NavBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
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
      console.log(json)
    })
  }

  render () {
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="">Action</a>
                  <a className="dropdown-item" href="">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleLogIn}>
              <input className="form-control mr-sm-2" value={this.state.email} name='email' onChange={this.handleInput} type="email" placeholder="Email" aria-label="Search"/>
              <input className="form-control mr-sm-2" value={this.state.password} name='password' onChange={this.handleInput} type="password" placeholder="Password" aria-label="Search"/>
              <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Log In</button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar;

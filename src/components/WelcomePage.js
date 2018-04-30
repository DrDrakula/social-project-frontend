import React from 'react'
import { logIn, setUser } from '../actions'
import { connect } from 'react-redux'

class WelcomePage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(json => {
      if(!json.error){
        console.log(json)
        localStorage.setItem('token',json.token)
        localStorage.setItem('user_id',json.user_id)
        localStorage.setItem('first_name',json.first_name)
        localStorage.setItem('slug',json.slug)
        this.props.setUser(json.user)
        this.props.logIn()
        this.setState({
          first_name:'',
          last_name:'',
          email:'',
          password:''
        })
      }else{
        console.log(json.error)
      }
    })
  }

  render () {
    return (
      <div>
        Create a new user:
        <form onSubmit={this.handleSubmit}>
          <input name='first_name' value={this.state.first_name} type='text' placeholder='First Name' onChange={this.handleInput} />
          <input name='last_name' value={this.state.last_name} type='text' placeholder='Last Name' onChange={this.handleInput} />
          <input name='email' value={this.state.email} type='email' placeholder='Email' onChange={this.handleInput} />
          <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleInput} />
          <input type='submit' value='Create' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, { logIn, setUser })(WelcomePage);

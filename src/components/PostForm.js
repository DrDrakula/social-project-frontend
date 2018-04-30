import React from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
class PostForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title:'',
      content: ''
    }
  }

  handleInput = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        user_id: this.props.currentUser.id
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.props.addPost(json)
      this.setState({title:'',content:''})
    })
  }

  render () {
    return (
      <form style={{'maxWidth':'500px'}} id='post-form'>
        <div className="input-group mb-3">
          <input type="text" name='title' value={this.state.title} onChange={this.handleInput} className="form-control" placeholder="Topic" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-outline-dark" onClick={this.handleSubmit} type="button">Post!</button>
          </div>
        </div>

        <div className="form-group">
          <textarea value={this.state.content} onChange={this.handleInput} className="form-control" name='content' id="exampleFormControlTextarea1" rows="3" placeholder='Content...'></textarea>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, {addPost})(PostForm);

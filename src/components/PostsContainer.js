import React from 'react'
import { connect } from 'react-redux'
class PostsContainer extends React.Component {

  state = {
    posts: []
  }

  getPosts = () => {
    fetch('http://localhost:3000/users/'+localStorage.getItem('user_id'))
    .then(res => res.json())
    .then(json => {
      if(json.user.posts){
        this.setState({posts: json.user.posts})
      }
    })
  }

  componentDidMount(){
    this.getPosts()
  }

  render () {
    ///////////////////////  MAKE A POST COMPONENT
    return (
      <div>
        <ul>
          {this.state.posts.map(post => <li key={post.id}><h3>{post.title}</h3><p>{post.content}</p></li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PostsContainer);

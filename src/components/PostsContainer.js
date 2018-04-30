import React from 'react'
import { connect } from 'react-redux'
class PostsContainer extends React.Component {

  getPosts = () => {
    if( this.props.currentUser && this.props.currentUser.posts){
      return (
        this.props.currentUser.posts.map(post => <li key={post.id}><h3>{post.title}</h3><p>{post.content}</p></li>)
      )
    }else{
      return (
        <h2>Loading</h2>
      )
    }
  }

  render () {
    ///////////////////////  MAKE A POST COMPONENT
    return (
      <div>
        <ul>
          {this.getPosts()}
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

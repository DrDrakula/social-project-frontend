import React from 'react'
import PostForm from './PostForm'
import PostsContainer from './PostsContainer'
import { connect } from 'react-redux'

class HomePage extends React.Component {

  render () {
    return (
      <div className='container first-div'>
        <h1>Home Page</h1>
        <div className='center'>
          <PostForm />
          <PostsContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(HomePage);

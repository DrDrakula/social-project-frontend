import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../actions'
class PostsContainer extends React.Component {

  componentDidMount(){
    this.props.getPosts()
  }

  render () {
    ///////////////////////  MAKE A POST COMPONENT

    return (
      <div>
        <ul>
          {this.props.posts ?
            this.props.posts.map(post => <li key={post.id}><div><h4>{post.title} <Link to={`/profile/${post.user.slug}`} className="by-who-span">by {post.user.first_name}</Link></h4><p>{post.content}<br/><span className="by-who-span">{post.created_at}</span></p></div></li>)
            :
            <h4>LOADING</h4>
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts })(PostsContainer);

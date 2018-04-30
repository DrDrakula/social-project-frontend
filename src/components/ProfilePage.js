import React from 'react'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user: {}
    }
  }

  getPosts = () => {
    if(this.state.user.posts){
      return (
        this.state.user.posts.map(post => <li key={post.id}><h3>{post.title}</h3><p>{post.content}</p></li>)
      )
    }else{
      return (
        <h2>LOADING</h2>
      )
    }
  }

  componentDidMount(){
    let slug = this.props.match.params.slug
    let id = slug.split('-')[slug.split('-').length - 1]

    fetch('http://localhost:3000/users/' + id)
    .then(res => res.json())
    .then(json => this.setState({user:json.user}, () => console.log(this.state)))
  }



  render () {
    return (
      <div>
        <h2>{this.state.user.first_name} {this.state.user.last_name}</h2>
        <h4>Posts</h4>
        <ul>
          {this.getPosts()}
        </ul>
      </div>
    )
  }
}

export default ProfilePage;

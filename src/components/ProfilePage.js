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
    .then(json => {
      if(json && json.user.first_name.toLowerCase() === slug.split('-')[0] && json.user.last_name.toLowerCase() === slug.split('-')[1]){
        this.setState({user:json.user})
      }else{
        this.setState({user:"This user doesn't exist"})
      }
    })
  }



  render () {
    return (
      <div className='container first-div'>
        {this.state.user !== "This user doesn't exist" ?
          <div>
            <h2>{this.state.user.first_name} {this.state.user.last_name}</h2>
            <h4>Posts</h4>
            <ul>
              {this.getPosts()}
            </ul>
          </div>
          :
          <h3>{this.state.user}</h3>
        }
      </div>
    )
  }
}

export default ProfilePage;

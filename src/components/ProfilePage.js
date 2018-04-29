import React from 'react'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user: {}
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
      </div>
    )
  }
}

export default ProfilePage;

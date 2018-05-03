export function setUser(user){
  return {
    type: 'SET_USER',
    payload: user
  }
}

export function search(people){
  return {
    type: 'SEARCH',
    payload: people
  }
}

export function getPosts(){
  return function(dispatch){
    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(json => {
      console.log('Entered get Action', json.posts)
      dispatch({
        type: 'GET_POSTS',
        payload: json.posts
      })
    })
  }
}

export function addPost(post){
  return {
    type: 'ADD_POST',
    payload: post
  }
}
export function addPostToUser(post){
  return {
    type: 'ADD_POST_TO_USER',
    payload: post
  }
}

export function logIn(){
  return {
    type: 'LOG_IN'
  }
}

export function logOut(){
  return {
    type: 'LOG_OUT'
  }
}

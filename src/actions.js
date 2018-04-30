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

export function addPost(post){
  return {
    type: 'ADD_POST',
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

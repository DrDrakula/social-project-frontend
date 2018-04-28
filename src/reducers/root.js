let defaultState = {
  loggedIn: false,
  currentUser: {}
}

const SET_USER = 'SET_USER'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

export default function root(state = defaultState, action){
  switch(action.type){
    case SET_USER:
      return {...state, currentUser: action.payload}
    case LOG_IN:
      return {...state, loggedIn: true}
    case LOG_OUT:
      return {...state, loggedIn: false}
    default:
      return state
  }
}

let defaultState = {
  currentUser: {}
}

const SET_USER = 'SET_USER'

export default function root(state = defaultState, action){
  switch(action.type){
    case SET_USER:
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}

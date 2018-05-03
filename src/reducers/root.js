const defaultState = {
  loggedIn: false,
  currentUser: {},
  searchResults: [],
  posts: []
}

const SET_USER = 'SET_USER'
const GET_POSTS = 'GET_POSTS'
const SEARCH = 'SEARCH'
const ADD_POST_TO_USER = 'ADD_POST_TO_USER'
const ADD_POST = 'ADD_POST'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

export default function root(state = defaultState, action){
  switch(action.type){
    case SET_USER:
      return {...state, currentUser: action.payload}
    case SEARCH:
      return {...state, searchResults: action.payload}
    case GET_POSTS:
      return {...state, posts: action.payload}
    case ADD_POST:
      return {...state, posts: [...state.posts, action.payload]}
    case ADD_POST_TO_USER:
      return {...state, currentUser: {...state.currentUser, posts: [...state.currentUser.posts, action.payload]}}
    case LOG_IN:
      return {...state, loggedIn: true}
    case LOG_OUT:
      return {...state, loggedIn: false, currentUser: {}}
    default:
      return state
  }
}

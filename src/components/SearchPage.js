import React from 'react'
import { connect } from 'react-redux'

const SearchPage = (props) => {
  return (
    <div />
  )
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps)(SearchPage)

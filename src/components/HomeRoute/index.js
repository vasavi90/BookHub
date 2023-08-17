import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class HomeRoute extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Find Your Next Favorite Books?</h1>
        <p className="description">
          Your in the right place. Tell us what titles or geners you have
          enjoyed in the past, and we will give you suprisingly insightful
          recommendations
        </p>

        <div className="books-container"></div>
      </div>
    )
  }
}
//package

export default HomeRoute

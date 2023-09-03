import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import TopRatedRoute from '../TopRatedRoute'
import FailureRoute from '../FailureRoute'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class HomeRoute extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(eachObject => ({
        id: eachObject.id,
        authorName: eachObject.author_name,
        coverPic: eachObject.cover_pic,
        title: eachObject.title,
      }))

      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {topRatedBooks} = this.state
    return (
      <div className="books-container">
        <div className="desktop-container">
          <p className="heading">Top Rated Books</p>
          <button type="button" className="desktop-button">
            Find Books
          </button>
          <div className="slick-container">
            <Slider {...settings}>
              {topRatedBooks.map(eachValue => (
                <TopRatedRoute details={eachValue} key={eachValue.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  failureView = () => <FailureRoute />

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      default:
        return null
    }
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

        <button type="button" className="button">
          Find Books
        </button>
        {this.renderView()}
      </div>
    )
  }
}

export default HomeRoute

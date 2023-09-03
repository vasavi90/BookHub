import './index.css'

const FailureRoute = () => (
  <div className="container">
    <h1 className="main-heading">Find Your Next Favorite Books?</h1>
    <p className="description">
      You are in the right place. Tell us what titles or geners you have enjoyed
      in the past, and you will give you surprisingly insightful recommendations
    </p>
    <button type="button" className="mobile-button">
      Find books
    </button>
    <div className="img-container">
      <p className="mobile-heading">Top Rated Books</p>
      <div className="desktop-container">
        <p className="desktop-heading">Top Rated Books</p>
        <button type="button" className="desktop-button">
          Find Books
        </button>
      </div>
      <img
        src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1693745017/Group_7522_ngmpdo.png"
        alt="mobile"
        className="mobile-image"
      />
      <p className="text">Some went wrong. Please try again.</p>
      <button type="button" className="button">
        Try again
      </button>
    </div>
  </div>
)
export default FailureRoute

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HeaderRoute = props => {
  const {history} = props
  const clickedLogout = () => {
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1691829615/Group_7731_fzlxgf.png"
          alt="mobile-logo"
          className="logo"
        />
      </Link>
      <nav className="mobile-nav">
        <Link to="/" className="mobile-link">
          Home
        </Link>
      </nav>
      <div className="desktop-links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/shelf" className="link">
          Bookshelves
        </Link>
        <button type="button" className="button" onClick={clickedLogout}>
          Find Books
        </button>
      </div>
    </div>
  )
}
export default withRouter(HeaderRoute)

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      const object = {
        expires: 30,
        path: '/',
      }
      Cookies.set('jwt_token', data.jwt_token, object)

      history.replace('/')
    } else {
      this.setState({
        showSubmitError: true,
      })
    }
  }

  render() {
    const {showSubmitError, username, password} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <img
          src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1692258521/Ellipse_99_wog6ct.png"
          alt="small-img"
          className="small-login-image"
        />
        <img
          src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1691828241/Rectangle_1467_leotfn.png"
          alt="big-img"
          className="big-login-img"
        />
        <div className="login-container">
          <form className="main-form" onSubmit={this.onSubmit}>
            <img
              src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1691829615/Group_7731_fzlxgf.png"
              alt="logo"
              className="logo-img"
            />
            <label htmlFor="username" className="label">
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={this.onChangeUserName}
            />
            <label htmlFor="password" className="label">
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={this.onChangePassword}
            />
            {showSubmitError && (
              <p className="error-text ">Username or Password is Invalid</p>
            )}
            <button type="button" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute

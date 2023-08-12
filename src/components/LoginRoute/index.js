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
    return (
      <div className="main-container">
        <img
          src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1691828241/Rectangle_1467_leotfn.png"
          alt="login-img"
        />
        <form onSubmit={this.submitForm} className="form">
          <img
            src="https://res.cloudinary.com/dgtyr0hwo/image/upload/v1691829615/Group_7731_fzlxgf.png"
            alt="logo"
            className="image"
          />
          <label className="label" htmlFor="username">
            Username*
          </label>
          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={this.onChangeUserName}
          />
          <label className="label" htmlFor="password">
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
            <p className="error">Username or Password is Invalid</p>
          )}
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginRoute

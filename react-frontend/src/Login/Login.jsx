import React from 'react';
import PropTypes from 'prop-types';
import './login.css';

export default class Login extends React.Component {
  render() {
    return (
      <div id="login-container">
        <div>
          <div id="logo"></div>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <div>
            <button>Login</button>
            <button>Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {

}

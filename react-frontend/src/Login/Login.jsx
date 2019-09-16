import React from 'react';
import PropTypes from 'prop-types';
import './login.css';

export default class Login extends React.Component {
  render() {
    return (
      <div id="login-container">
        <div>
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

//En este momento no están redireccionando los botones de login y signup a ninguna función, deberían manejar estos eventos para lograr el objetivo de estos. 
//También podrían manejarlo con un form al hacer el submit

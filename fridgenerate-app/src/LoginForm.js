import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className="form-container">
        <form className="form-box" onSubmit={e => this.props.handle_login(e, this.state)}>
          <h4>Login</h4>
          <label className="login-form" htmlFor="username"></label>
          <input className="auth-input" 
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          <br />
          <label className="login-form" htmlFor="password"></label>
          <input className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handle_change}
          />
          <br />
          <input className="Ingredients-button" type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
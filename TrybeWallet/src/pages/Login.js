import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveEmail, authToLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validUser: false,
      authorizationToLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
    this.checkCredentials();
  }

  checkCredentials() {
    const { email, password } = this.state;
    const regExp = /\w+@\w+.com?/;
    const emailValidation = regExp.test(email);
    const minPasswordLength = 5;
    const passwordValidation = password.length >= minPasswordLength;
    if (emailValidation && passwordValidation) {
      this.setState({
        validUser: true,
      });
    }
    return (emailValidation && passwordValidation);
  }

  redirectToWallet() {
    const { email } = this.state;
    const { stateEmailToStore, isAuthorizedToStore } = this.props;
    const validation = this.checkCredentials();
    if (validation) {
      stateEmailToStore(email);
      this.setState({
        authorizationToLogin: true,
      }, () => isAuthorizedToStore(true));
    }
  }

  render() {
    const { validUser, authorizationToLogin } = this.state;
    return (
      <div>
        { authorizationToLogin && <Redirect to="/carteira" /> }
        <div>Logo</div>
        <div>
          <input
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            type="email"
            placeholder="Email "
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            type="password"
            placeholder="Password "
          />
        </div>
        <div>
          <button
            onClick={ this.redirectToWallet }
            type="button"
            disabled={ !validUser }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stateEmailToStore: (payload) => { dispatch(saveEmail(payload)); },
  isAuthorizedToStore: (payload) => { dispatch(authToLogin(payload)); },
});

Login.propTypes = ({
  stateEmailToStore: PropTypes.func.isRequired,
  isAuthorizedToStore: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Login);

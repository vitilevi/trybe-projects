/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchToken, loginAction, fetchQuestions } from '../actions';
import {
  saveTokenToStore,
  resetStore,
} from '../service/handleLocalStorage';
import LoginForm from '../components/LoginForm';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: '',
      name: '',
      ready: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => { this.checkInputs(); });
  }

  handleLocalStorage() {
    const { token } = this.props;
    saveTokenToStore(token);
  }

  async handleLogin() {
    const { name, email } = this.state;
    const { initToken, setLogin, getQuestions } = this.props;
    resetStore(name, email);
    await initToken();
    const { token } = this.props;
    this.handleLocalStorage();
    await getQuestions(token);
    setLogin(name, email);
    this.setState({
      ready: true,
    });
  }

  checkInputs() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  redirectSettings() {
    window.location = 'configuracao';
  }

  render() {
    const { disabled, ready } = this.state;
    return (
      <div className="login-container">
        <form className="login-form">
          <LoginForm handleChange={ this.handleChange } />
          <button
            type="button"
            onClick={ this.handleLogin }
            data-testid="btn-play"
            disabled={ disabled }
            className="login-btn button"
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirectSettings() }
            className="login-btn button"
          >
            Configurações
          </button>
        </form>
        { ready && <Redirect to="/game" />}
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  token: loginReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  initToken: () => dispatch(fetchToken()),
  setLogin: (name, email) => dispatch(loginAction({ name, email })),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = ({
  initToken: PropTypes.func.isRequired,
  token: PropTypes.string,
  setLogin: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
});

Login.defaultProps = ({
  token: '',
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

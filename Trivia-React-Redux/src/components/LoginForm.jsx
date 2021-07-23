import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/loginForm.css';

export default class LoginForm extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div className="box loginForm-div">
        <div className="field columns">
          <label htmlFor="input-name" className="label">
            <div className="control has-icons-left has-icons-right column is-full">
              <input
                className="input is-link"
                type="text"
                placeholder="Digite seu nome"
                id="input-name"
                onChange={ (e) => handleChange(e) }
                data-testid="input-player-name"
                name="name"
              />
            </div>
          </label>
        </div>
        <div className="field columns">
          <label htmlFor="input-email" className="label">
            <div className="control has-icons-left has-icons-right column is-full">
              <input
                className="input is-link"
                type="email"
                placeholder="Digite seu email"
                id="input-email"
                onChange={ (e) => handleChange(e) }
                name="email"
                data-testid="input-gravatar-email"
              />
            </div>
          </label>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = ({
  handleChange: PropTypes.func.isRequired,
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateTitleInput extends Component {
  render() {
    const { title, callback } = this.props;
    return (
      <label htmlFor="add-title" data-testid="title-input-label">
        Título
        <input
          name="title"
          type="text"
          id="add-title"
          value={ title }
          data-testid="title-input"
          onChange={ callback }
        />
      </label>
    );
  }
}

CreateTitleInput.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

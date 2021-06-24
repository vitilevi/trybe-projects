import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateSubtitleInput extends Component {
  render() {
    const { subtitle, callback } = this.props;
    return (
      <label htmlFor="add-subtitle" data-testid="subtitle-input-label">
        Subtítulo
        <input
          name="subtitle"
          type="text"
          id="add-subtitle"
          value={ subtitle }
          data-testid="subtitle-input"
          onChange={ callback }
        />
      </label>
    );
  }
}

CreateSubtitleInput.propTypes = {
  subtitle: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

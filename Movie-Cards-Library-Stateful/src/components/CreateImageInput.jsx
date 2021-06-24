import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateImageInput extends Component {
  render() {
    const { imagePath, callback } = this.props;
    return (
      <label htmlFor="add-image" data-testid="image-input-label">
        Imagem
        <input
          name="imagePath"
          type="text"
          id="add-image"
          value={ imagePath }
          data-testid="image-input"
          onChange={ callback }
        />
      </label>
    );
  }
}

CreateImageInput.propTypes = {
  imagePath: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

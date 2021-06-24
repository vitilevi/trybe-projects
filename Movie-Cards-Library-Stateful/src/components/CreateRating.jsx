import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateRating extends Component {
  render() {
    const { rating, callback } = this.props;
    return (
      <label htmlFor="add-rating" data-testid="rating-input-label">
        Avaliação
        <input
          name="rating"
          type="number"
          id="add-rating"
          value={ rating }
          data-testid="rating-input"
          onChange={ callback }
        />
      </label>
    );
  }
}

CreateRating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  callback: PropTypes.func.isRequired,
};

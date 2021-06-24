import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateGenre extends Component {
  render() {
    const { genre, callback } = this.props;
    return (
      <label htmlFor="add-genre" data-testid="genre-input-label">
        Gênero
        <select
          name="genre"
          id="add-genre"
          data-testid="genre-input"
          value={ genre }
          onChange={ callback }
        >
          <option value="action" data-testid="genre-option">Ação</option>
          <option value="comedy" data-testid="genre-option">Comédia</option>
          <option value="thriller" data-testid="genre-option">Suspense</option>
        </select>
      </label>
    );
  }
}

CreateGenre.propTypes = {
  genre: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

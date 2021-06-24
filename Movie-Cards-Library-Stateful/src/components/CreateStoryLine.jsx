import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateStoryLine extends Component {
  render() {
    const { storyLine, callback } = this.props;
    return (
      <label htmlFor="add-storyline" data-testid="storyline-input-label">
        Sinopse
        <textarea
          name="storyLine"
          id="add-storyline"
          // cols="30"
          // rows="10"
          value={ storyLine }
          data-testid="storyline-input"
          onChange={ callback }
        />
      </label>
    );
  }
}

CreateStoryLine.propTypes = {
  storyLine: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

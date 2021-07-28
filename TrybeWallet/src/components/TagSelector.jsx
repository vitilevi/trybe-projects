import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TagSelector extends Component {
  constructor() {
    super();
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(event) {
    const { change } = this.props;
    change(event);
  }

  render() {
    const { value } = this.props;
    return (
      <label htmlFor="select-tag">
        Tag
        <select
          value={ value }
          onChange={ this.handleStateChange }
          data-testid="tag-input"
          name="tag"
          id="select-tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

TagSelector.propTypes = ({
  change: PropTypes.func.isRequired,
  value: PropTypes.string,
});

TagSelector.defaultProps = ({
  value: '',
});

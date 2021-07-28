import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MethodSelector extends Component {
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
      <label htmlFor="payment-method">
        Método de pagamento
        <select
          value={ value }
          data-testid="method-input"
          onChange={ this.handleStateChange }
          name="method"
          id="payment-method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

MethodSelector.propTypes = ({
  change: PropTypes.func.isRequired,
  value: PropTypes.string,
});

MethodSelector.defaultProps = ({
  value: '',
});

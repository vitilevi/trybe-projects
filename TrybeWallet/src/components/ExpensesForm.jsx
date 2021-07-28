import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagSelector from './TagSelector';
import MethodSelector from './MethodSelector';
import { addExpense } from '../actions';
import fetchApi from '../services';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendInformation = this.sendInformation.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  async sendInformation() {
    const { expenses, addNewExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeRates = await fetchApi();
    const id = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;

    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    addNewExpense(obj);
    this.resetState();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            onChange={ this.handleChange }
            value={ value }
            id="value"
            name="value"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea
            name="description"
            onChange={ this.handleChange }
            value={ description }
            id="description"
          />
        </label>
        <label htmlFor="currency-selector">
          Moeda
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency-selector"
          >
            {currencies.map((el) => (
              <option key={ el } value={ el }>{ el }</option>
            ))}
          </select>
        </label>
        <MethodSelector value={ method } change={ this.handleChange } />
        <TagSelector value={ tag } change={ this.handleChange } />
        <button onClick={ this.sendInformation } type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (payload) => dispatch(addExpense(payload)),
});

ExpensesForm.propTypes = ({
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewExpense: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

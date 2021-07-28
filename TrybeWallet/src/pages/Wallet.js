import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import EditExpenseForm from '../components/EditExpenseForm';
import fetchApi from '../services';
import { saveCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: [],
    };
    this.handleState = this.handleState.bind(this);
  }

  async componentDidMount() {
    const { saveObj } = this.props;
    const apiResponse = await fetchApi();
    const arrayOfCurrencies = Object.keys(apiResponse).map((element) => (
      apiResponse[element]))
      .filter(({ codein }) => codein !== 'BRLT');
    this.handleState(arrayOfCurrencies);
    saveObj(arrayOfCurrencies.map((currency) => currency.code));
  }

  handleState(value) {
    this.setState(() => ({
      currency: value,
    }));
  }

  calculateConversion() {
    const { expenses } = this.props;
    const askPrices = [];
    expenses.forEach(({ currency, exchangeRates }) => {
      askPrices.push(exchangeRates[currency].ask);
    });
    return askPrices;
  }

  calculateTotal() {
    const { expenses } = this.props;
    const askValues = this.calculateConversion();
    const totalConverted = expenses.reduce((acc, curr, index) => (
      acc + Number(curr.value) * askValues[index]), 0);
    return (Math.round(totalConverted * 100) / 100).toFixed(2);
  }

  render() {
    const { email, edit } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">
            { this.calculateTotal() }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          {edit ? <EditExpenseForm /> : currency.length > 0 && <ExpensesForm />}
          <ExpensesTable />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  edit: wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  saveObj: (payload) => dispatch(saveCurrency(payload)),
});

Wallet.propTypes = ({
  email: PropTypes.string.isRequired,
  saveObj: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  edit: PropTypes.bool,
});

Wallet.defaultProps = ({
  saveObj: () => {},
  edit: false,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

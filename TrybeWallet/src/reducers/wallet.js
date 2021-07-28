import {
  ADD_EXPENSE,
  SAVE_CURRENCY,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: false,
  expenseToEdit: [],
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE: {
    const oldArray = [...state.expenses];
    const newArray = oldArray.filter((el) => el.id !== payload.id);
    return {
      ...state,
      expenses: [...newArray],
      totalCalculed: Number(state.totalCalculed) - Number(payload.value),
    };
  }
  case EDIT_EXPENSE: {
    const expense = state.expenses.find((el) => el.id === payload);
    return {
      ...state,
      editExpense: true,
      expenseToEdit: expense,
    };
  }
  case EDIT_EXPENSE_SUCCESS: {
    const filteredExpenses = state.expenses.filter((el) => el.id !== payload.id);
    const nexExpenses = [...filteredExpenses, payload].sort((a, b) => a.id - b.id);
    return {
      ...state,
      expenses: [...nexExpenses],
      editExpense: false,
      expenseToEdit: [],
    };
  }
  case SAVE_CURRENCY:
    return {
      ...state,
      currencies: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;

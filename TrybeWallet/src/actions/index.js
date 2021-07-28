export const SAVE_EMAIL = 'SAVE_EMAIL';
export const AUTH_TO_LOGIN = 'AUTH_TO_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SAVE_CURRENCY = 'SAVE_CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_SUCCESS = 'EDIT_EXPENSE_SUCCESS';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const authToLogin = (payload) => ({
  type: AUTH_TO_LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const saveCurrency = (payload) => ({
  type: SAVE_CURRENCY,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const editExpenseSuccess = (payload) => ({
  type: EDIT_EXPENSE_SUCCESS,
  payload,
});

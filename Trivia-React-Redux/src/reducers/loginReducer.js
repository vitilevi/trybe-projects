import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  LOGIN,
} from '../actions';

const INITIAL_STATE = {
  token: {},
  isLoading: false,
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      token: payload.token,
    };
  case LOGIN:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
    };
  default:
    return {
      ...state,
    };
  }
};

export default loginReducer;

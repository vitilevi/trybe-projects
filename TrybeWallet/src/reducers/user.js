import { SAVE_EMAIL, AUTH_TO_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  authorization: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: payload,
    };
  case AUTH_TO_LOGIN:
    return {
      ...state,
      authorization: payload,
    };
  default:
    return state;
  }
};

export default userReducer;

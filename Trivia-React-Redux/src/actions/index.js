export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const ADD_SCORE = 'ADD_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const NEW_GAME = 'NEW_GAME';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

export const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

export const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const requestQuestions = (payload) => ({
  type: REQUEST_QUESTIONS,
  payload,
});

export const requestQuestionsSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const newGame = () => ({
  type: NEW_GAME,
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken);
  return (fetch('https://opentdb.com/api_token.php?command=request'))
    .then((response) => response.json())
    .then((result) => dispatch(requestTokenSuccess(result)))
    .catch((error) => dispatch(requestTokenError(error)));
};

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return (fetch(`https://opentdb.com/api.php?amount=5&token=${token}`))
    .then((response) => response.json())
    .then((result) => dispatch(requestQuestionsSuccess(result)));
};

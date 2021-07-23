import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  ADD_SCORE,
  NEXT_QUESTION,
  NEW_GAME,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  score: 0,
  correctAnswers: 0,
  currentQuestion: 0,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      questions: [...payload.results],
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + payload,
      correctAnswers: state.correctAnswers + 1,
    };
  case NEXT_QUESTION: {
    const maxNumber = 4;
    if (state.currentQuestion === maxNumber) {
      return {
        ...state,
      };
    }
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
    };
  }
  case NEW_GAME:
    return {
      ...state,
      questions: [],
      isLoading: false,
      score: 0,
      correctAnswers: 0,
      currentQuestion: 0,
    };
  default:
    return {
      ...state,
    };
  }
};

export default gameReducer;

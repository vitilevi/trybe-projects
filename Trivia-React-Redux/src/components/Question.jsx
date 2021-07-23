import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveScoreToStore, saveAssertionToStore } from '../service/handleLocalStorage';
import { nextQuestion as newQuestion, addScore } from '../actions';
import '../styles/question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      nextIsDisabled: true,
      redirectToFeedback: false,
      isAnswered: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDisabledButton = this.handleDisabledButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.returnNextButton = this.returnNextButton.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  handleNextQuestion() {
    const { nextQuestion, currentQuestion, reset } = this.props;
    this.setState({
      nextIsDisabled: true,
      isAnswered: false,
    }, () => {
      const maxIndex = 4;
      if (currentQuestion === maxIndex) {
        this.setState({
          redirectToFeedback: true,
        });
      }
      nextQuestion();
      reset();
    });
  }

  handleDisabledButton() {
    this.setState({
      nextIsDisabled: false,
    });
  }

  handleClick() {
    const { clearInterval } = this.props;
    clearInterval();
    this.handleDisabledButton();
    this.setState({
      isAnswered: true,
    });
  }

  handleLocalStorage(score) {
    const { addNewScore } = this.props;
    addNewScore(score);
    saveScoreToStore(score);
    saveAssertionToStore();
  }

  calculateScore() {
    const { count, question: { difficulty } } = this.props;
    const scoreNumbers = { easy: 1, medium: 2, hard: 3, default: 10 };
    switch (difficulty) {
    case ('easy'): {
      const score = scoreNumbers.default + (Number(count) * scoreNumbers.easy);
      this.handleLocalStorage(score);
      break;
    }
    case ('medium'): {
      const score = scoreNumbers.default + (Number(count) * scoreNumbers.medium);
      this.handleLocalStorage(score);
      break;
    }
    case ('hard'): {
      const score = scoreNumbers.default + (Number(count) * scoreNumbers.hard);
      this.handleLocalStorage(score);
      break;
    }
    default:
      break;
    }
  }

  returnNextButton() {
    return (
      <button
        type="button"
        onClick={ this.handleNextQuestion }
        data-testid="btn-next"
        className="next-btn button"
      >
        PRÓXIMA
      </button>
    );
  }

  render() {
    const { nextIsDisabled, redirectToFeedback, isAnswered } = this.state;
    const { question: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    }, disabled } = this.props;
    return (
      <div className="question-container">
        <div className="question-header">
          { redirectToFeedback && <Redirect to="/feedback" /> }
          <p id="question-text" data-testid="question-text">{question}</p>
          <p id="category" data-testid="question-category">{`Category: ${category}`}</p>
        </div>
        <div className="question-btn-container">
          <button
            type="button"
            data-testid="correct-answer"
            className={ isAnswered ? 'button question-btn correct-color'
              : 'button question-btn' }
            onClick={ () => {
              this.calculateScore();
              this.handleClick();
            } }
            disabled={ disabled }
          >
            {correctAnswer}
          </button>
          {incorrectAnswers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid="wrong-answer"
              className={ isAnswered ? 'button question-btn wrong-color'
                : 'button question-btn' }
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="next-btn-container">
          { disabled || !nextIsDisabled ? this.returnNextButton() : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  currentQuestion: gameReducer.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(newQuestion()),
  addNewScore: (payload) => dispatch(addScore(payload)),
});

Question.propTypes = ({
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  clearInterval: PropTypes.func.isRequired,
  addNewScore: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

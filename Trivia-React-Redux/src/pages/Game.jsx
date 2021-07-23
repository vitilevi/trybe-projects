import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';
import '../styles/game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
      disabled: false,
    };
    this.counter = this.counter.bind(this);
    this.counterFunc = this.counterFunc.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.clearCounterInterval = this.clearCounterInterval.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  resetCounter() {
    this.setState({
      count: 30,
      disabled: false,
    });
    this.counter();
  }

  counterFunc() {
    const { count } = this.state;
    if (count > 0) {
      this.setState({
        count: count - 1,
      });
    } else if (count === 0) {
      this.clearCounterInterval();
      this.setState({
        count: 0,
        disabled: true,
      });
    }
  }

  clearCounterInterval() {
    clearInterval(this.interval);
  }

  counter() {
    const interval = 1000;
    this.interval = setInterval(this.counterFunc, interval);
  }

  render() {
    const { questionArray, currentQuestion } = this.props;
    const { disabled, count } = this.state;
    if (questionArray.length === 0) return <h1>loading...</h1>;
    return (
      <div className="game-container">
        <HeaderGame />
        <Question
          count={ count }
          counter={ this.counter }
          clearInterval={ this.clearCounterInterval }
          reset={ this.resetCounter }
          question={ questionArray[currentQuestion] }
          disabled={ disabled }
        />
        <div className="game-counter">{ count }</div>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  questionArray: gameReducer.questions,
  currentQuestion: gameReducer.currentQuestion,
});

Game.propTypes = ({
  questionArray: PropTypes.arrayOf(PropTypes.object),
  currentQuestion: PropTypes.number,
});

Game.defaultProps = ({
  questionArray: [],
  currentQuestion: 0,
});

export default connect(mapStateToProps)(Game);

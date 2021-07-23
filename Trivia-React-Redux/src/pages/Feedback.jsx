import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { newGame } from '../actions';
import HeaderGame from '../components/HeaderGame';
import fetchAvatar from '../service/requestAvatar';
import { saveRankPlayer } from '../service/handleLocalStorage';
import '../styles/feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.state = { };
    this.resultQuestions = this.resultQuestions.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
  }

  async componentDidMount() {
    const { email, score, name } = this.props;
    const hashEmail = md5(email).toString();
    const avatarUrl = await fetchAvatar(hashEmail);
    this.setAvatar(avatarUrl);
    const { url } = this.state;
    saveRankPlayer(name, score, url);
  }

  setAvatar(url) {
    this.setState({
      url,
    });
  }

  resultQuestions() {
    const lessThree = 'Podia ser melhor...';
    const moreThree = 'Mandou bem!';
    const numberHits = 3;
    const { questions } = this.props;
    if (questions >= numberHits) {
      return (
        <p data-testid="feedback-text">
          {moreThree}
        </p>);
    }
    return (
      <p data-testid="feedback-text">
        {lessThree}
      </p>);
  }

  render() {
    const { score, questions, prepareNewGame } = this.props;
    return (
      <div className="feedback-container">
        <HeaderGame />
        <div className="feedback-wrapper">
          <div className="feedback-message">
            {this.resultQuestions()}
          </div>
          <div className="feedback-score">
            <p data-testid="feedback-total-score">{ `Score: ${score}` }</p>
            <p
              data-testid="feedback-total-question"
            >
              { `Questões acertadas: ${questions}` }
            </p>
          </div>
        </div>
        <Link
          data-testid="btn-play-again"
          className="button question-btn feedback-btn"
          to="/"
          onClick={ () => prepareNewGame() }
        >
          Jogar novamente
        </Link>
        <Link
          data-testid="btn-ranking"
          to="/ranking"
          className="button question-btn feedback-btn"
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer, loginReducer }) => ({
  questions: gameReducer.correctAnswers,
  score: gameReducer.score,
  email: loginReducer.email,
  name: loginReducer.name,
});

const mapDispatchToProps = (dispatch) => ({
  prepareNewGame: () => dispatch(newGame()),
});

Feedback.propTypes = ({
  questions: PropTypes.string,
  store: PropTypes.number,
  prepareNewGame: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

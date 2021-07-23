import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame } from '../actions';
import { getFromStore } from '../service/handleLocalStorage';
import '../styles/ranking.css';

class Ranking extends Component {
  render() {
    const { prepareNewGame } = this.props;
    const rankingArray = getFromStore('ranking')
      .sort((ranking1, ranking2) => ranking2.score - ranking1.score);
    return (
      <div className="ranking-container">
        <h1 className="ranking-title" data-testid="ranking-title">
          Ranking
        </h1>
        {rankingArray.map(({ name, score, picture }, index) => (
          <div className="ranking-wrapper" key={ index }>
            <div className="ranking-img">
              <img src={ picture } alt="player" />
            </div>
            <div className="ranking-info">
              <p
                className="ranking-name"
                data-testid={ `player-name-${index}` }
              >
                {name}
              </p>
              <p
                className="ranking-score"
                data-testid={ `player-score-${index}` }
              >
                {`Score: ${score}`}
              </p>
            </div>
          </div>
        ))}
        <Link
          to="/"
          className="button question-btn"
          data-testid="btn-go-home"
          onClick={ () => prepareNewGame() }
        >
          Voltar para a tela inical
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  prepareNewGame: () => dispatch(newGame()),
});

Ranking.propTypes = ({
  prepareNewGame: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Ranking);

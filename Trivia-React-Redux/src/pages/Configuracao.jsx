import React, { Component } from 'react';
import '../styles/configuration.css';
import { Link } from 'react-router-dom';
import constructionImage from '../pablita-530.png';

class Configuracao extends Component {
  render() {
    return (
      <div className="configuration-container">
        <div>
          <p data-testid="settings-title">Configurações</p>
          <img
            className="construction-img"
            src={ constructionImage }
            alt="Em construção"
          />
        </div>
        <Link
          to="/"
          className="button question-btn"
          data-testid="btn-go-home"
        >
          Voltar para a tela inical
        </Link>
      </div>
    );
  }
}

export default Configuracao;

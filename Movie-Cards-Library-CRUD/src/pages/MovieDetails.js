import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movie: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const { match: { params: { id } } } = this.props;
    this.setState(() => ({
      loading: true,
    }),
    async () => {
      const info = await movieAPI.getMovie(id);
      this.setState({
        movie: info,
        loading: false,
      });
    });
  }

  render() {
    const { loading, movie } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const pageData = (
      <div className="movie-body">
        <div className="movie-info text-white text-wrap">
          <img className="movie-info-img" alt="Movie Cover" src={ `../${imagePath}` } />
          <div className="movie-info-data">
            <p>{ `Title: ${title}` }</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>
          </div>
        </div>
        <div className="movie-btn">
          <Link className="button btn btn-info" to={ `/movies/${id}/edit` }>EDITAR</Link>
          <Link
            className="button btn btn-danger"
            to="/"
            onClick={ () => movieAPI.deleteMovie(id) }
          >
            DELETAR
          </Link>
          <Link className="button btn btn-primary" to="/">VOLTAR</Link>
        </div>
      </div>
    );
    const load = loading ? <Loading /> : pageData;
    return (
      <div data-testid="movie-details">
        { load }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;

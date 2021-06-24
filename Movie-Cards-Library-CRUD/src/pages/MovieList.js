import React, { Component } from 'react';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: false,
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    this.setState(() => ({
      loading: true,
    }),
    async () => {
      const movieObj = await movieAPI.getMovies();
      this.setState({
        movies: movieObj,
        loading: false,
      });
    });
  }

  render() {
    const { movies, loading } = this.state;
    const movieCard = movies.map(
      (movie) => <MovieCard key={ movie.title } movie={ movie } />,
    );
    const load = loading ? <Loading /> : movieCard;
    return (
      <div className="movie-list container-fluid" data-testid="movie-list">
        { load }
      </div>
    );
  }
}

export default MovieList;

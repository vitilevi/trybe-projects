import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      movies,
      bookmarkedOnly: false,
      selectedGenre: '',
      searchText: '',
    };
    this.initialState = { ...this.state };
    this.onClick = this.onClick.bind(this);
    this.modifyState = this.modifyState.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
  }

  onClick(info) {
    this.setState((state) => ({
      movies: [...state.movies, info],
    }));
  }

  filterMovies() {
    const { bookmarkedOnly, selectedGenre, searchText, movies } = this.state;
    let filtered = movies;
    if (searchText) {
      filtered = movies.filter((el) => el.title.includes(searchText)
      || el.subtitle.includes(searchText) || el.storyline.includes(searchText));
    }
    if (bookmarkedOnly) filtered = movies.filter((el) => el.bookmarked === true);
    if (selectedGenre) filtered = movies.filter((el) => el.genre === selectedGenre);
    return filtered;
  }

  modifyState({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.modifyState }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.modifyState }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.modifyState }
        />
        <MovieList movies={ this.filterMovies() } />
        <AddMovie onClick={ this.onClick } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default MovieLibrary;

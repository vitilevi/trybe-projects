import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shouldRedirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovie = this.getMovie.bind(this);
  }

  componentDidMount() {
    this.getMovie();
  }

  handleSubmit(updatedMovie) {
    this.setState(() => ({
      loading: true,
    }),
    async () => {
      await movieAPI.updateMovie(updatedMovie);
      this.setState({
        loading: false,
        shouldRedirect: true,
      });
    });
  }

  getMovie() {
    const { match: { params: { id } } } = this.props;
    this.setState(() => ({
      loading: true,
    }),
    async () => {
      const movieObj = await movieAPI.getMovie(id);
      this.setState({
        movie: movieObj,
        loading: false,
      });
    });
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }
    const pageData = (<MovieForm movie={ movie } onSubmit={ this.handleSubmit } />);
    const load = loading ? <Loading /> : pageData;
    return (
      <div data-testid="edit-movie">
        { load }
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditMovie;

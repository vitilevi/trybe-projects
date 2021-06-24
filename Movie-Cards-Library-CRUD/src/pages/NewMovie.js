import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(newMovie) {
    this.setState(() => ({
      loading: true,
    }),
    async () => {
      await movieAPI.createMovie(newMovie);
      this.setState({
        loading: false,
        shouldRedirect: true,
      });
    });
  }

  render() {
    const { loading, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }
    const pageData = <MovieForm onSubmit={ this.handleSubmit } />;
    const load = loading ? <Loading /> : pageData;
    return (
      <div data-testid="new-movie">
        { load }
      </div>
    );
  }
}
export default NewMovie;

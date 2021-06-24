import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    const { movie } = props;
    this.state = { ...movie };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  updateMovie(field, newValue) {
    if (field === 'rating') {
      const value = Number(newValue);
      this.setState({ [field]: value });
    } else {
      this.setState({ [field]: newValue });
    }
  }

  renderTitleInput() {
    const { title } = this.state;

    return (
      <div className="row">
        <label htmlFor="movie_title" className="form-label">
          Título
          <input
            placeholder="Insira o título"
            id="movie_title"
            type="text"
            className="validate form-control"
            value={title}
            onChange={(event) => this.updateMovie('title', event.target.value)}
          />
        </label>
      </div>
    );
  }

  renderSubtitleInput() {
    const { subtitle } = this.state;

    return (
      <div className="row">
        <label htmlFor="movie_subtitle" className="form-label">
          Subtítulo
          <input
            placeholder="Insira o subtítulo"
            id="movie_subtitle"
            type="text"
            className="form-label form-control"
            value={subtitle}
            onChange={(event) => this.updateMovie('subtitle', event.target.value)}
          />
        </label>
      </div>
    );
  }

  renderImagePathInput() {
    const { imagePath } = this.state;

    return (
      <div className="row">
        <label htmlFor="movie_image" className="form-label">
          Imagem
          <input
            placeholder="Insira o caminho da imagem"
            id="movie_image"
            type="text"
            className="form-control"
            value={imagePath}
            onChange={(event) => this.updateMovie('imagePath', event.target.value)}
          />
        </label>
      </div>
    );
  }

  renderStorylineInput() {
    const { storyline } = this.state;

    return (
      <div>
        <label htmlFor="movie_storyline" className="form-label">
          Sinopse
          <textarea
            id="movie_storyline"
            value={storyline}
            className="form-control"
            rows="3"
            cols="200"
            onChange={(event) => this.updateMovie('storyline', event.target.value)}
          />
        </label>
      </div>
    );
  }

  renderGenreSelection() {
    const { genre } = this.state;
    return (
      <div>
        <label htmlFor="movie_genre" className="form-label">
          Gênero
          <select
            id="movie_genre"
            value={genre}
            className="form-select"
            onChange={(event) => this.updateMovie('genre', event.target.value)}
          >
            <option value="action">Ação</option>
            <option value="comedy">Comédia</option>
            <option value="thriller">Suspense</option>
            <option value="fantasy">Fantasia</option>
          </select>
        </label>
      </div>
    );
  }

  renderRatingInput() {
    const { rating } = this.state;
    return (
      <div>
        <label htmlFor="movie_rating" className="form-label">
          Avaliação
          <input
            placeholder="Dê a avaliação do filme"
            id="movie_rating"
            type="number"
            className="form-control"
            step={0.1}
            min={0}
            max={5}
            value={rating}
            onChange={(event) => this.updateMovie('rating', event.target.value)}
          />
        </label>
      </div>
    );
  }

  renderSubmitButton() {
    return (
      <div>
        <button
          className="button btn btn-success"
          type="button"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        <Link className="button btn btn-primary" to="/">Voltar</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="mb-3 container-lg">
        <form>
          {this.renderTitleInput()}
          {this.renderSubtitleInput()}
          {this.renderImagePathInput()}
          {this.renderStorylineInput()}
          {this.renderGenreSelection()}
          {this.renderRatingInput()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

MovieForm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
    bookmarked: PropTypes.bool,
    genre: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

MovieForm.defaultProps = {
  movie: {
    id: '',
    title: '',
    subtitle: '',
    storyline: '',
    rating: 0,
    imagePath: '',
    bookmarked: false,
    genre: '',
  },
};

export default MovieForm;

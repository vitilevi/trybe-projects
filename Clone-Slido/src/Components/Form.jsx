import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      name: '',
      votes: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checked = this.checked.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { onChange } = this.props;
    onChange(this.state);
    this.setState({
      question: '',
      name: '',
    });
  }

  checked({ target: { checked } }) {
    const { popular } = this.props;
    popular(checked);
  }

  render() {
    const { question, name } = this.state;
    return (
      <div>
        <div>
          <div>
            <label className="form-label" htmlFor="name-input">
              <input
                id="name-input"
                name="name"
                className=" name form-control"
                value={name}
                onChange={this.handleChange}
                type="text"
                placeholder="Insira seu nome"
              />
            </label>
          </div>
          <div>
            <label className="form-label" htmlFor="question-input">
              <textarea
                id="question-input"
                name="question"
                className="form-control"
                rows="3"
                cols="24"
                value={question}
                onChange={this.handleChange}
                placeholder="Insira sua pergunta"
              />
            </label>
          </div>
          <button className="button btn btn-success" type="button" onClick={this.handleSubmit}>Send</button>
        </div>
        <div>
          <label className="form-check-label">
            Popular?
            <input className="checkbox form-check-input" type="checkbox" onChange={this.checked} />
          </label>
        </div>
      </div>
    )
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
};

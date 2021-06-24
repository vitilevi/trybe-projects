import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Pics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { obj } = this.props;
    if(prevProps.obj !== obj) {
      this.setState({obj: obj});
    }
  }

  render() {
    const { obj } = this.state;
    return (
      <div className="pictures-collection">
        { obj.map(({ id, camera, img_src }) => {
            return(
              <div className="picture-body" key={ id }>
                <div className="picture-title">
                  <span>{ camera.name } - { id }</span>
                </div>
                <div className="picture-wrapper">
                  <a href={ img_src } target="_blank" rel="noreferrer">
                    <img className="picture" src={ img_src } alt={ camera.full_name } />
                  </a>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Pics.propTypes = {
  obj: PropTypes.array.isRequired,
};

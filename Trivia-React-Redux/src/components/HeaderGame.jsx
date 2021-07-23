import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import fetchAvatar from '../service/requestAvatar';
import '../styles/headerGame.css';

class Header extends Component {
  constructor() {
    super();
    this.state = { };
    this.setAvatar = this.setAvatar.bind(this);
  }

  async componentDidMount() {
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    const avatarUrl = await fetchAvatar(hashEmail);
    this.setAvatar(avatarUrl);
  }

  setAvatar(url) {
    this.setState({
      url,
    });
  }

  render() {
    const { name, score } = this.props;
    const { url } = this.state;
    return (
      <header className="headerGame">
        <div className="headerGame-img">
          <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        </div>
        <div className="headerGame-info">
          <h3 data-testid="header-player-name">{ name }</h3>
          <h4 data-testid="header-score">{ `Score: ${score}`}</h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ loginReducer, gameReducer }) => ({
  email: loginReducer.email,
  name: loginReducer.name,
  score: gameReducer.score,
  currentQuestion: gameReducer.currentQuestion,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

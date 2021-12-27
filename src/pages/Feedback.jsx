import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { Link } from 'react-router-dom';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    const { email } = this.props;

    this.state = {
      profilePictureLink: `https://www.gravatar.com/avatar/${MD5(email).toString()}`,
    };
  }

  addPlayerInRanking(name, score, picture) {
    const rankingObj = { name, score, picture };
    const rankingJson = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingJson);
    ranking.push(rankingObj);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { name, email } = this.props;
    const { profilePictureLink } = this.state;
    const storage = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = storage.player;
    const minScore = 3;
    this.addPlayerInRanking(name, score, profilePictureLink);
    return (
      <>
        <Header name={ name } email={ email } score={ score } />
        <div
          className={ `scoreboard ${assertions < minScore ? 'incorrect' : 'correct'}` }
        >
          <h1 className="scoreboard-title">Placar Final</h1>
          <div>
            <span>
              Pontuação Final:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </span>
            <span>
              Respostas Corretas:
              {' '}
              <span data-testid="feedback-total-question">{ assertions }</span>
            </span>
          </div>
        </div>
        <FeedbackMessage />
        <div className="feedback-buttons">
          <Link data-testid="btn-play-again" to="/">
            <img
              src={ `${process.env.PUBLIC_URL}/assets/images/restart.ico` }
              alt="restart"
              className="restart-icon"
            />
            <button type="button">Jogar novamente</button>
          </Link>
          {' '}
          <Link data-testid="btn-ranking" to="/ranking">
            <img
              src={ `${process.env.PUBLIC_URL}/assets/images/trophy.ico` }
              alt="trophy"
              className="trophy-icon"
            />
            <button type="button">Ver Ranking</button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

Feedback.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);

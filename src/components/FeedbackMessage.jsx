import React, { Component } from 'react';

class FeedbackMessage extends Component {
  render() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { assertions } = storage.player;
    const average = 3;

    return (
      <div>
        <h2 className="feedback-title" data-testid="feedback-text">
          { assertions < average
            ? 'Podia ser melhor...'
            : 'Mandou bem!' }
        </h2>
      </div>
    );
  }
}

export default FeedbackMessage;

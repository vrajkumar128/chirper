import React from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends React.Component {
  state = {
    text: ''
  }

  // Update state based on user input
  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  }

  // Add a new tweet when user submits form
  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddTweet(text, id));
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    const charactersLeft = 280 - text.length;

    return (
      <div>
        <h3 className="center">Compose New Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            maxLength={280}
          />

          <div className={charactersLeft <= 100 ? "tweet-length-low" : "tweet-length-high"}>
            {charactersLeft}
          </div>

          <button
            className="btn"
            type="submit"
            disabled={!text}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);

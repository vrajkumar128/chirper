import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import TweetList from './components/TweetList';

class App extends React.Component {
  // Fetch initial data
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  // Render a loading spinner
  renderSpinner = () => (
    <div className="center">
      <img src="https://svgshare.com/i/7bd.svg" alt="Loading spinner" />
    </div>
  )

  render() {
    const { tweetIds } = this.props;

    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        {this.props.loadingBar.default
          ? this.renderSpinner()
          : <TweetList tweetIds={tweetIds} />}
      </div>
    );
  }
}

const mapStateToProps = ({ loadingBar, tweets }) => ({
  loadingBar,
  tweetIds: Object.keys(tweets)
    .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
});

export default connect(mapStateToProps)(App);

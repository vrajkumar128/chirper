import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import TweetList from './components/TweetList';
import LoadingBar from 'react-redux-loading';
import TweetPage from './components/TweetPage';

class App extends React.Component {
  // Fetch initial data
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { tweetIds } = this.props;

    return (
      <div>
        <LoadingBar />
        <TweetPage match={{params: {id: "2mb6re13q842wu8n106bhk"}}} />
        <h3 className="center">Your Timeline</h3>
        {this.props.loadingBar.default === 0 && <TweetList tweetIds={tweetIds} />}
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

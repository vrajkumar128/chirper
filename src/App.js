import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import TweetList from './components/TweetList';
import LoadingBar from 'react-redux-loading';

class App extends React.Component {
  // Fetch initial data
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <h3 className="center">Your Timeline</h3>
        {this.props.loadingBar.default === 0 && <TweetList />}
      </div>
    );
  }
}

const mapStateToProps = ({ loadingBar }) => ({
  loadingBar
});

export default connect(mapStateToProps)(App);

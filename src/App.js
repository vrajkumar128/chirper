import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import TweetList from './components/TweetList';
import loader from './icons/Rolling-1s-200px.svg';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  loadingSpinner = () => (
    <div></div>
  );

  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        {this.props.authedUser !== null ? <TweetList /> : <img className="center" height="100px" src={loader} />}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(App);

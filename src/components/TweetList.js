import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

const TweetList = props => {
  // Render list of tweets
  const renderTweets = () => (
    props.tweetIds.map((tweetId) => (
      <li key={tweetId} className="center">
        <Tweet id={tweetId} />
      </li>
    ))
  );

  return (
    <div>
      <ul className="dashboard-list">
        {props.tweetIds && props.tweetIds.length > 0 ? renderTweets() : "No tweets!"}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ tweets }) => ({
  tweetIds: Object.keys(tweets)
    .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
});

export default connect(mapStateToProps)(TweetList);

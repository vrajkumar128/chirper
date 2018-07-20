import React from 'react';
import Tweet from './Tweet';

const TweetList = props => {
  // Render list of tweets
  const renderTweets = () => (
    <ul>
      {props.tweetIds.map((tweetId) => (
        <li key={tweetId}>
          <Tweet id={tweetId} />
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <ul className="dashboard-list">
        {props.tweetIds && props.tweetIds.length > 0 ? renderTweets() : <p className="center">No tweets!</p>}
      </ul>
    </div>
  );
};

export default TweetList;

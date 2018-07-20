import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';
import TweetList from './TweetList';

const TweetPage = props => {
  const { id, replies } = props;

  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id}/>
      <h3 className="center">Replies</h3>
      {replies.length > 0 ? <TweetList tweetIds={replies} /> : <p className="center">This tweet has no replies!</p>}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, tweets }, ownProps) => {
  const { id } = ownProps.match.params;

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
  };
};

export default connect(mapStateToProps)(TweetPage);

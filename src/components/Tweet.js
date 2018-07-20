import React from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';
import { handleToggleTweet } from '../actions/tweets';

const Tweet = props => {
  const { tweet } = props;

  if (!tweet) {
    return <p className="center">This tweet does not exist!</p>;
  };

  const {
    name, avatar, timestamp, text, hasLiked, likes, replies, parent
  } = tweet;

  // Go to parent tweet
  const handleClick = (e) => {
    e.preventDefault();
  }

  // Like a tweet
  const handleLike = (e) => {
    const { dispatch, tweet, authedUser } = props;

    dispatch(handleToggleTweet({
      id: tweet.id,
      authedUser,
      hasLiked: tweet.hasLiked,
    }));
  }

  // Render tweet data
  const renderInfo = () => (
    <div>
      <span>{name}</span>
      <div>{formatDate(timestamp)}</div>
      {parent && (
        <button className="replying-to" onClick={handleClick}>
          Replying to @{parent.author}
        </button>
      )}
      <p>{text}</p>
    </div>
  );

  // Render reply & like icons
  const renderIcons = () => (
    <div className="tweet-icons">
      <TiArrowBackOutline className="tweet-icon" title="Reply to this tweet" />
      <span>{replies !== 0 && replies}</span>
      <button className="heart-button" onClick={handleLike}>
        {hasLiked
          ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" title="Unlike this tweet" />
          : <TiHeartOutline className="tweet-icon" title="Like this tweet" />}
      </button>
      <span>{likes !== 0 && likes}</span>
    </div>
  );

  return (
    <div className="tweet">
      <img
        src={avatar}
        className="avatar"
        title={name}
        alt={`Avatar of ${name}`}
      />
      <div className="tweet-info">
        {renderInfo()}
        {renderIcons()}
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
};

export default connect(mapStateToProps)(Tweet);

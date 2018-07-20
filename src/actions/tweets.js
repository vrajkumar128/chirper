import { saveLikeToggle } from '../utils/api';

// Map strings to constants (better typo detection)
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";

// Receive tweets action creator
export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets
});

// Toggle tweet action creator
const toggleTweet = (id, authedUser, hasLiked) => ({
  type: TOGGLE_TWEET,
  id,
  authedUser,
  hasLiked
});

// Optimistically toggle a tweet in the local state before making sure that it toggles on the server
export const handleToggleTweet = (info) => async (dispatch) => {
  dispatch(toggleTweet(info));

  try {
    saveLikeToggle(info);
  } catch (err) {
    throw Error(err);
    dispatch(toggleTweet(info));
    alert('There was an error liking the tweet. Try again');
  }
}

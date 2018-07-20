import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

// Map strings to constants (better typo detection)
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

// Receive tweets action creator
export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets
});

// Toggle tweet action creator
const toggleTweet = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_TWEET,
  id,
  authedUser,
  hasLiked
});

// Add tweet action creator
const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet
});

// Optimistically toggle a tweet in the local state before making sure that it toggles on the server
export const handleToggleTweet = (info) =>
  async (dispatch) => {
    dispatch(toggleTweet(info));

    try {
      await saveLikeToggle(info);
    } catch (err) {
      console.error("Error:", err);
      dispatch(toggleTweet(info));
      alert('There was an error liking the tweet. Try again');
  }
}

// Add a tweet to the server
export const handleAddTweet = (text, replyingTo) =>
  async (dispatch, getState) => {
    const { authedUser } = getState();

    if (authedUser) {
      try {
        dispatch(showLoading());
        const tweet = await saveTweet({
          text,
          author: authedUser,
          replyingTo
        });

        dispatch(addTweet(tweet));
        dispatch(hideLoading());
      } catch (err) {
        console.error("Error:", err);
        dispatch(hideLoading());
        alert("There was an error submitting the tweet. Try again")
      }
    } else {
      alert('Error: You must be logged in to perform this action')
    }
}

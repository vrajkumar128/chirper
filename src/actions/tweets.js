// Map strings to constants (better typo detection)
export const RECEIVE_TWEETS = "RECEIVE_TWEETS";

// Receive tweets action creator
export const receiveTweets(tweets) => ({
  type: RECEIVE_TWEETS,
  tweets
});

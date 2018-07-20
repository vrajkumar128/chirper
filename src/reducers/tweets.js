import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

// Tweets reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };

    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      };

    case ADD_TWEET:
      const { tweet } = action;
      let replyingTo = {};

      // If tweet being added is a reply to another tweet, concatenate the former to the latter's 'replies' property
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        };
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo
      }

    default:
      return state;
  }
};

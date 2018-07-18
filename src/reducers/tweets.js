import { RECEIVE_TWEETS } from '../actions/users';

// Tweets reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    default:
      return state;
  }
}

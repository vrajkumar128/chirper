import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

// Set authedUser id
const AUTHED_ID = 'tylermcginnis';

// Retrieve initial data from server (w/ corresponding progress bar)
export const handleInitialData = () => async (dispatch) => {
  dispatch(showLoading());
  const { users, tweets } = await getInitialData();

  dispatch(receiveUsers(users));
  dispatch(receiveTweets(tweets));
  dispatch(setAuthedUser(AUTHED_ID));
  dispatch(hideLoading());
};

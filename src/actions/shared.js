import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';

// Set authenticated UID
const AUTHED_ID = 'tylermcginnis';

// Retrieve initial data from server
export const handleInitialData = () => async (dispatch) => {
  const { users, tweets } = await getInitialData();

  dispatch(receiveUsers(users));
  dispatch(receiveTweets(tweets));
  dispatch(setAuthedUser(AUTHED_ID));
};

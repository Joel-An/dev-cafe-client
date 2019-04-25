import { selectUserById } from './users';

export const selectToken = state => state.auth.token;

const selectMyId = state => state.auth.myId;

const GUEST = {
  _id: undefined,
  profileName: undefined,
  isGuest: true,
};

export const selectMyInfo = (state) => {
  const myId = selectMyId(state);
  const myInfo = selectUserById(state, myId);

  return myInfo || GUEST;
};

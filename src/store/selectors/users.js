export const selectUsers = state => state.newEntities.users;
// TODO: newEntities -> entities 변경

export const selectUserById = (state, id) => selectUsers(state)[id];

export const selectUsers = state => state.entities.users;

export const selectUserById = (state, id) => selectUsers(state)[id];

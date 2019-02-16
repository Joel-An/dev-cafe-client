export const selectComments = state => state.entities.comments;

export const selectCommentById = (state, id) => selectComments(state)[id];

export const selectCommentsMetaByPost = (state, postId) => state.pagination.commentsByPost[postId];

export const selectEditingCommentById = (state, id) => state.editing.comments[id];

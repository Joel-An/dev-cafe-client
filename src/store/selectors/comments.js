export const selectComments = state => state.newEntities.comments;
// TODO: newEntities -> entities 변경

export const selectCommentById = (state, id) => selectComments(state)[id];

export const selectCommentsMetaByPost = (state, postId) => state.newPagination.commentsByPost[postId];

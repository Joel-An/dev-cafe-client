export const selectPosts = state => state.newEntities.posts;
// TODO: newEntities -> entities 변경

export const selectPostById = (state, id) => selectPosts(state)[id];

export const selectPostsMetaByCategory = (state, categoryId) => state.newPagination.postsByCategory[categoryId];

export const selectEditingPostById = (state, postId) => state.editing.posts[postId];

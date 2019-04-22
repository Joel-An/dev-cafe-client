import openSocket from 'socket.io-client';

import { fetchCategory, removeCategory } from '../store/actions/categories';
import {
  fetchNewPost,
  removePost,
  checkCacheAndUpdatePost,
} from '../store/actions/posts';
import {
  checkCacheAndFetchNewComment,
  removeComment,
  checkCacheAndUpdateComment,
  addHeart,
  removeHeart,
  addCommentLikes,
  removeCommentLikes,
  addCommentDislikes,
  removeCommentDislikes,
} from '../store/actions/comments';

const url = process.env.NODE_ENV === 'production' ? 'https://rejoelve.com' : 'http://localhost:3000';

const connectSocket = () => openSocket(url, { transports: ['websocket'] });

const setHandler = (socket, store) => {
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('socket.io is connected');
  });

  socket.on('NEW_CATEGORY', (id) => {
    store.dispatch(fetchCategory(id));
  });

  socket.on('DELETE_CATEGORY', (id) => {
    store.dispatch(removeCategory(id));
  });

  socket.on('NEW_POST', (data) => {
    store.dispatch(fetchNewPost(data.postId, data.categoryId));
  });

  socket.on('DELETE_POST', (data) => {
    store.dispatch(removePost(data.postId, data.categoryId));
  });

  socket.on('UPDATE_POST', (data) => {
    store.dispatch(checkCacheAndUpdatePost(data.postId));
  });

  socket.on('NEW_COMMENT', (data) => {
    const { commentId, parentId, postId } = data;

    store.dispatch(checkCacheAndFetchNewComment(commentId, postId, parentId));
  });

  socket.on('DELETE_COMMENT', (data) => {
    store.dispatch(removeComment(data.commentId, data.postId));
  });

  socket.on('UPDATE_COMMENT', (data) => {
    store.dispatch(checkCacheAndUpdateComment(data.commentId));
  });

  socket.on('POST_HEART', (data) => {
    const { commentId, authorId } = data;
    store.dispatch(addHeart(commentId, authorId));
  });

  socket.on('DELETE_HEART', (data) => {
    const { commentId } = data;
    store.dispatch(removeHeart(commentId));
  });

  socket.on('POST_COMMENT_LIKES', (data) => {
    const { commentId, userId } = data;
    store.dispatch(addCommentLikes(commentId, userId));
  });

  socket.on('DELETE_COMMENT_LIKES', (data) => {
    const { commentId, userId } = data;
    store.dispatch(removeCommentLikes(commentId, userId));
  });

  socket.on('POST_COMMENT_DISLIKES', (data) => {
    const { commentId, userId } = data;
    store.dispatch(addCommentDislikes(commentId, userId));
  });

  socket.on('DELETE_COMMENT_DISLIKES', (data) => {
    const { commentId, userId } = data;
    store.dispatch(removeCommentDislikes(commentId, userId));
  });
};

const configureSocket = (store) => {
  const socket = connectSocket();
  setHandler(socket, store);

  const closeSocket = () => socket.close();
  return closeSocket;
};

export default configureSocket;

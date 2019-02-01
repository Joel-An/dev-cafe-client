import openSocket from 'socket.io-client';

import { getCategory, removeCategory } from '../store/actions/categories';
import { fetchPost } from '../store/actions/posts';

const connectSocket = () => openSocket({ transports: ['websocket'] });

const setHandler = (socket, store) => {
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('socket.io is connected');
  });

  socket.on('NEW_CATEGORY', (id) => {
    store.dispatch(getCategory(id));
  });

  socket.on('DELETE_CATEGORY', (id) => {
    store.dispatch(removeCategory(id));
  });

  socket.on('NEW_POST', (data) => {
    store.dispatch(fetchPost(data.postId, data.categoryId));
  });
};

const configureSocket = (store) => {
  const socket = connectSocket();
  setHandler(socket, store);

  const closeSocket = () => socket.close();
  return closeSocket;
};

export default configureSocket;

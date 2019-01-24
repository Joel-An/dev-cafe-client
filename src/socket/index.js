import openSocket from 'socket.io-client';

import { getCategory, removeCategory } from '../store/actions/categories';

const setUri = () => (process.env.NODE_ENV === 'development' ? '/socket.io' : 'http://rejoelve.com');

const connectSocket = URI => openSocket(URI, { transports: ['websocket'] });

const setHandler = (socket, store) => {
  socket.on('NEW_CATEGORY', (id) => {
    store.dispatch(getCategory(id));
  });

  socket.on('DELETE_CATEGORY', (id) => {
    store.dispatch(removeCategory(id));
  });
};

const configureSocket = (store) => {
  const URI = setUri();

  const socket = connectSocket(URI);
  setHandler(socket, store);

  const closeSocket = () => socket.close();
  return closeSocket;
};

export default configureSocket;

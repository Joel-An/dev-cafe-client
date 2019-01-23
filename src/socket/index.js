import openSocket from 'socket.io-client';

import { getCategory, removeCategory } from '../store/actions/categories';

const setUri = () => {
  switch (process.env.NODE_ENV) {
  case 'development':
    return '/socket.io';
  case 'production':
    return 'http://rejoelve.com';
  case 'test':
    return 'http://localhost';
  default:
    throw new Error('NODE_ENV 설정이 잘못되었습니다.');
  }
};

const connectSocket = URI => openSocket({ path: URI, transports: ['websocket'] });

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
